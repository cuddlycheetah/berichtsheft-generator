import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { APIProfileService } from '../api/apiprofile.service';
import { AuthService } from '../auth.service';

function passwordConfirming(c: AbstractControl): any {
  if (!c.parent || !c) { return;}
  const pwd = c.parent.get('password');
  const cpwd = c.parent.get('confirm_password');

  if (!pwd || !cpwd) { return; }
  if (pwd.value !== cpwd.value) {
      return { invalid: true };
  }
}

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  changePasswordGroup: FormGroup;
  changeNameGroup: FormGroup;

  constructor (
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    public apiProfile: APIProfileService,
    public authService: AuthService,
  ) {
    this.changePasswordGroup = this.formBuilder.group({
      password: [null, Validators.required],
      confirm_password: [null, [Validators.required, passwordConfirming]]
    });
    this.changeNameGroup = this.formBuilder.group({
      name: ['', Validators.required],
    });

  }

  async ngOnInit() {
    (await this.apiProfile.fetch())
    .subscribe(res => {
      console.log(res);
      this.changeNameGroup.get('name').setValue(res.name);
    });
  }

  async changePW() {
    const alert = await this.alertCtrl.create({
      header: 'Bestätigung erforderlich!',
      message: 'Möchten sie wirklich ihr Passwort ändern?</br></br>Hinweis: Sie werden dannach abgemeldet und müssen sich neu anmelden.',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Passwort ändern',
          handler: async () => {
            const password = this.changePasswordGroup.value.password;
            (await this.apiProfile.changePassword(password))
            .subscribe(res => {
              this.authService.logout();
            });
          }
        }
      ]
    });
    await alert.present();
  }
  async changeName() {
    const name = this.changeNameGroup.value.name;
    (await this.apiProfile.changeName(name))
    .subscribe(res => {
    });
  }
}
