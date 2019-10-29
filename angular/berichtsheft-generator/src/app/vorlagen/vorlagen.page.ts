import { Component, OnInit } from '@angular/core';
import { APITemplatesService } from '../api/apitemplates.service';
import Vorlage from '../api/vorlage';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vorlagen',
  templateUrl: './vorlagen.page.html',
  styleUrls: ['./vorlagen.page.scss'],
})
export class VorlagenPage implements OnInit {
  public listVorlage = [] as Vorlage[];

  constructor(
    private apiTemplates: APITemplatesService,
    private alertCtrl: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.refresh();
  }

  async refresh() {
    (await this.apiTemplates.getAll())
    .subscribe((res: Vorlage[]) => {
      this.listVorlage = res;
    });
  }
  async mewDocument() {
    const alert = await this.alertCtrl.create({
      header: 'Neue Vorlage',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Vorlagenbezeichnung'
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
              (await this.apiTemplates.create(res.name))
              .subscribe((res: Vorlage[]) => {
                this.refresh();
              });
            }
          }
        }
      ]
    });

    await alert.present();
  }
  async editVorlage(vorlage) {
    this.router.navigate([ 'main', 'vorlagen@', vorlage.uuid ]);
  }
  async deleteVorlage(vorlage) {
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
            (await this.apiTemplates.delete(vorlage.uuid))
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
