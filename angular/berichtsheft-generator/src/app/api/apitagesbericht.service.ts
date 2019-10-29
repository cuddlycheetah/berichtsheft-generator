import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { API_HOST } from './host';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Wochenbericht } from './wochenbericht';

@Injectable({
  providedIn: 'root'
})
export class APITagesberichtService {

  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router
  ) { }
  async create(wochenbericht: string, tag: number) {
    const loading = await this.loadingCtrl.create({
      message: 'Erstelle Tagesbericht',
      translucent: true,
    });
    await loading.present();
    return this.http.post(`${ API_HOST }/api/v1/self/wochenbericht/${ wochenbericht }/${ tag }`, {})
    .pipe(
      finalize(() => loading.dismiss())
    ) as Observable<any>;
  }
  async update(wochenbericht: string, tagesbericht: string, updateData: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Ändere Tagesbericht',
      translucent: true,
    });
    await loading.present();
    return this.http.put(`${ API_HOST }/api/v1/self/wochenbericht/${ wochenbericht }/tagesbericht/${ tagesbericht }`, updateData)
    .pipe(
      finalize(() => loading.dismiss())
    ) as Observable<any>;
  }
  async delete(wochenbericht: string, tagesbericht: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Lösche Tagesbericht',
      translucent: true,
    });
    await loading.present();
    return this.http.delete(`${ API_HOST }/api/v1/self/wochenbericht/${ wochenbericht }/tagesbericht/${ tagesbericht }`)
    .pipe(
      finalize(() => loading.dismiss())
    ) as Observable<any>;
  }
}

/*
=== LEGACY CODE ===
create: function(wochenbericht, tag) {
  console.log('Factory.self.berichtshefte.wochenberichte.tagesberichte.create(', wochenbericht, tag, ')')

  return $http.post(urlBase + 'self/wochenbericht/' + wochenbericht + '/tagesbericht/' + tag)
},
update: function(wochenbericht, tagesbericht, updateData) {
  return $http.put(urlBase + 'self/wochenbericht/' + wochenbericht + '/tagesbericht/' + tagesbericht, updateData)
},
delete: function(wochenbericht, tagesbericht) {
  return $http.delete(urlBase + 'self/wochenbericht/' + wochenbericht + '/tagesbericht/' + tagesbericht)
},
*/
