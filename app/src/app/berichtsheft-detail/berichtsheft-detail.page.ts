import { Component, OnInit } from '@angular/core';
import { Berichtsheft } from '../api/berichtsheft';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { APIWochenberichteService } from '../api/apiwochenberichte.service';
import { Wochenbericht } from '../api/wochenbericht';
import { APITemplatesService } from '../api/apitemplates.service';
import Vorlage from '../api/vorlage';
import { forkJoin } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-berichtsheft-detail',
  templateUrl: './berichtsheft-detail.page.html',
  styleUrls: ['./berichtsheft-detail.page.scss'],
})
export class BerichtsheftDetailPage implements OnInit {
  public listVorlage = [] as Vorlage[];

  public berichtsheftDetails: Berichtsheft = {} as Berichtsheft;
  public wochenberichtDetails: Wochenbericht = {} as Wochenbericht;
  public wochenberichtsForm: FormGroup;
  public kwMin = '';
  public kwMax = '';
  public kwSel = new FormControl('');
  public dayNames = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

  public selectedTemplate = '';

  constructor(
    private route: ActivatedRoute,
    private apiWochenbericht: APIWochenberichteService,
    private apiTemplates: APITemplatesService,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
  ) {
    this.wochenberichtsForm = this.formBuilder.group({
      id: [''],
      tage: this.formBuilder.array([]),
    });
  }

  async refreshTemplates() {
    forkJoin([
      await this.apiTemplates.getAll(),
      await this.apiTemplates.getGlobal()
    ])
    .subscribe((res: Vorlage[][]) => {
      this.listVorlage = res[0].concat(res[1]);
    });
  }
  ngOnInit() {
    this.refreshTemplates();
    this.berichtsheftDetails = this.route.snapshot.data.berichtsheft;
    const start = moment(this.berichtsheftDetails.start);
    const ende = moment(this.berichtsheftDetails.ende);
    const now = moment();
    this.kwMin = `${ start.format('YYYY') }-W${ start.format('w') }`;
    this.kwMax = `${ ende.format('YYYY') }-W${ ende.format('w') }`;

    this.kwSel.valueChanges.subscribe((newVal) => {
      this.loadWochenbericht(newVal.split('-W')[0], newVal.split('-W')[1]);
    });
    this.kwSel.setValue(
      now.toDate().valueOf() <= ende.toDate().valueOf()
      ? `${ now.format('YYYY') }-W${ now.format('w') }`
      : this.kwMax
    );
  }
  initTaetigkeit() {
    const arr =  this.formBuilder.array([
      this.formBuilder.control(''), // legacy support
      this.formBuilder.control('', [ Validators.required, Validators.maxLength(180) ]),
      this.formBuilder.control('0:00', [ Validators.required, Validators.maxLength(6) ])
    ]);
    return arr;
  }
  async loadWochenbericht(jahr, kw) {
    console.log(jahr, kw);
    (await this.apiWochenbericht.get(this.berichtsheftDetails.uuid, jahr, kw))
    .subscribe(res => {
      console.log(res);
      this.wochenberichtDetails = res;

      // Formular aus Arrays/Groups rekonstruieren
      if (!!this.wochenberichtDetails.free) {
        this.wochenberichtsForm = this.formBuilder.group({
          id: [''],
          tage: this.formBuilder.array([]),
        });
      } else {
        this.wochenberichtsForm = this.formBuilder.group({
          id: [this.wochenberichtDetails.id, Validators.required],
          tage: this.formBuilder.array(
            this.wochenberichtDetails.tage.map((tag) => {
              const group = this.formBuilder.group({
                uuid: [tag.uuid, Validators.required],
                id: [tag.id, Validators.required],
                start: [tag.start, Validators.required],
                ende: [tag.ende, Validators.required],
                pause: [tag.pause, Validators.required],
  //            erweitert: [tag.uuid, Validators.required],
                taetigkeiten: this.formBuilder.array(
                  tag.taetigkeiten.map(taetigkeit => this.formBuilder.array([
                    this.formBuilder.control(taetigkeit[0] || ''), // legacy support
                    this.formBuilder.control(taetigkeit[1] || '', [ Validators.required, Validators.maxLength(180) ]),
                    this.formBuilder.control(taetigkeit[2] || '0:00', [ Validators.required, Validators.maxLength(6) ])
                  ]))
                ),
                krank: [tag.krank],
                frei: [tag.frei, tag.krank ? Validators.required : []]
              });
              group.get('krank').valueChanges.subscribe(
                (isKrank: boolean) => {
                  group.get('frei').setValidators(
                    isKrank
                      ? [Validators.required]
                      : []
                  );
                  group.get('frei').updateValueAndValidity();
                }
              );
              return group;
            })
          ),
        }); // ende formBuilder <-- ja manchmal sind solche kommentare nützlich um den überblick nicht zu verlieren
      }
    });
  }
  async createWochenbericht() {
    const jahr = this.kwSel.value.split('-W')[0], kw = this.kwSel.value.split('-W')[1];
    (await this.apiWochenbericht.create(this.berichtsheftDetails.uuid, jahr, kw, this.selectedTemplate))
    .subscribe(res => {
      console.log(res);
      this.loadWochenbericht(jahr, kw);
    });
  }
  async deleteWochenbericht() {
    const alert = await this.alertCtrl.create({
      header: 'Bestätigung erforderlich!',
      message: 'Möchten sie wirklich die Vorlage löschen?',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Ja, löschen!',
          handler: async () => {
            const jahr = this.kwSel.value.split('-W')[0], kw = this.kwSel.value.split('-W')[1];
            (await this.apiWochenbericht.delete(this.berichtsheftDetails.uuid, this.wochenberichtDetails.uuid))
            .subscribe(res => {
              console.log(res);
              this.loadWochenbericht(jahr, kw);
            });
          }
        }
      ]
    });

    await alert.present();
  }
  async saveChangedTagesberichtsAndWochenbericht() {
    const original = JSON.stringify({
      id: this.wochenberichtDetails.id,
      tage: this.wochenberichtDetails.tage.map(tag => {
        delete tag.erweitert; // remove legacy shitfuck
        return tag;
      }),
    });
    const formVersion = JSON.stringify(this.wochenberichtsForm.value);
    console.log('changed', original !== formVersion, original, formVersion);
  }
}
