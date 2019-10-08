import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { API_HOST } from '../app.module';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class APIProfileService {

  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router
  ) { }
  async changePassword (newPassword) {
    const loading = await this.loadingCtrl.create({
      message: 'Ändere Passwort',
      translucent: true,
    });
    await loading.present();
    return this.http.put(`${ API_HOST }/api/v1/self/profile/password`, {
      new: newPassword
    })
    .pipe(
      finalize(() => loading.dismiss())
    ) as Observable<any>;
  }
}