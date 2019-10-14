import { Component, OnInit } from '@angular/core';
import { APIBerichtshefteService } from '../api/apiberichtshefte.service';
import { Berichtsheft } from '../api/berichtsheft';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    private router: Router
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
