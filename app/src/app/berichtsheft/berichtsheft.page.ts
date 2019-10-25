import { Component, OnInit, Inject, OnDestroy, NgZone } from '@angular/core';
import { APIBerichtshefteService } from '../api/apiberichtshefte.service';
import { Berichtsheft } from '../api/berichtsheft';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-berichtsheft',
  templateUrl: './berichtsheft.page.html',
  styleUrls: ['./berichtsheft.page.scss'],
})
export class BerichtsheftPage implements OnInit {
  private displayedColumns = ['name', 'kwoffset', 'uuid'];
  public listBerichtshefte: Berichtsheft[] = [];

  constructor(
    private apiBerichtsheft: APIBerichtshefteService,
    private alertCtrl: AlertController,
    private router: Router,
    public dialog: MatDialog
  ) { }
  ngOnInit() {
    this.refresh();
  }
  selectBerichtsheft(row) {
    console.log(row);
  }
  async refresh() {
    (await this.apiBerichtsheft.getAll())
    .subscribe((data: Berichtsheft[]) => {
      this.listBerichtshefte = data;
    });
  }

  async mewDocument() {
    const alert = await this.alertCtrl.create({
      header: 'Neues Berichtsheft',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Berichtsheft-Bezeichnung'
        },
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Erstellen',
          handler: async (res) => {
            if (!!res.name && res.name.length > 3) {
              (await this.apiBerichtsheft.create(res.name))
              .subscribe((res: any) => {
                this.refresh();
              });
            }
          }
        }
      ]
    });

    await alert.present();
  }
  async openBerichtsheft(berichtsheft) {
    this.router.navigate([ 'main', 'berichtsheft@', berichtsheft.uuid ]);
  }
  async editBerichtsheftOffset(berichtsheft) {
    const alert = await this.alertCtrl.create({
      header: 'Eingabe benötigt!',
      message: 'Bitte geben sie das Offset für die fortlaufende Nummerierung an',
      inputs: [
        {
          name: 'offset',
          type: 'number',
          placeholder: 'KW-Offset',
          value: berichtsheft.kwoffset,
        },
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Speichern',
          handler: async (res: any) => {
            if (!!res.offset) {
              (await this.apiBerichtsheft.update(berichtsheft.uuid, {
                kwoffset: res.offset,
              }))
              .subscribe(res2 => {
                this.refresh();
              });
            }
          }
        }
      ],
    });

    await alert.present();
  }
  async editBerichtsheftBereich(berichtsheft) {
    const dialogRef = this.dialog.open(EditBereichDialogComponent, {
      width: '90%',
      height: '75%',
      data: {
        berichtsheft: berichtsheft.uuid,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.refresh();
      }
    });
    console.log(berichtsheft);
  }
  async deleteBerichtsheft(berichtsheft) {
    const alert = await this.alertCtrl.create({
      header: 'Bestätigung erforderlich!',
      message: 'Möchten sie wirklich dieses Berichtsheft löschen?</br></br>Hinweis: Dies löscht auch alle Wochen und Tagesberichte!',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Ja, löschen!',
          handler: async () => {
            (await this.apiBerichtsheft.delete(berichtsheft.uuid))
            .subscribe(res => {
              this.refresh();
            });
          }
        }
      ]
    });

    await alert.present();
  }
}

export interface EditBereichDialogData {
  berichtsheft: string;
}
@Component({
  selector: 'edit-bereich-dialog',
  templateUrl: 'edit-bereich-modal/edit-bereich-modal.component.html',
})
export class EditBereichDialogComponent {
  public berichtsheftData: Berichtsheft = {} as Berichtsheft;

  public bereichFormGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditBereichDialogComponent>,
    private apiBerichtsheft: APIBerichtshefteService,
    @Inject(MAT_DIALOG_DATA) public data: EditBereichDialogData
  ) {
    this.init();
    const now = moment();
    this.bereichFormGroup = this.formBuilder.group({
      start: this.formBuilder.control(`${ now.format('YYYY') }-W${ now.format('w') }`, Validators.required),
      ende: this.formBuilder.control(`${ now.format('YYYY') }-W${ now.format('w') }`, Validators.required),
    });

  }
  async init() {
    (await this.apiBerichtsheft.get(this.data.berichtsheft))
    .subscribe((res) => {
      this.berichtsheftData = res;
      const start = moment(this.berichtsheftData.start);
      const ende = moment(this.berichtsheftData.ende);
      const startKW = `${ start.format('YYYY') }-W${ start.format('w') }`;
      const endeKW = `${ ende.format('YYYY') }-W${ ende.format('w') }`;

      console.log(res, start, startKW, ende, endeKW);

      this.bereichFormGroup = this.formBuilder.group({
        start: this.formBuilder.control(startKW, Validators.required),
        ende: this.formBuilder.control(endeKW, Validators.required),
      });
    });
  }
  toDate(kwFormat) {
    return moment(kwFormat.replace('W', ''), 'YYYY-w').toDate();
  }
  async save() {
    (await this.apiBerichtsheft.update(this.berichtsheftData.uuid, {
      start: this.toDate(this.bereichFormGroup.value.start),
      ende: this.toDate(this.bereichFormGroup.value.ende),
    }))
    .subscribe(res2 => {
      this.dialogRef.close(true);
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
