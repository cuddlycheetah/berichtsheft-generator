import { Component, OnInit, Inject, OnDestroy, NgZone } from '@angular/core';
import { APIBerichtshefteService } from '../api/apiberichtshefte.service';
import { Berichtsheft } from '../api/berichtsheft';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

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
      console.log('The dialog was closed', result);
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

  constructor(
    public dialogRef: MatDialogRef<EditBereichDialogComponent>,
    private apiBerichtsheft: APIBerichtshefteService,
    @Inject(MAT_DIALOG_DATA) public data: EditBereichDialogData
  ) {
    this.init();
  }
  async init() {
    (await this.apiBerichtsheft.get(this.data.berichtsheft))
    .subscribe((res) => {
      this.berichtsheftData = res;
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
