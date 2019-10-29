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
export class APIWochenberichteService {

  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router
  ) { }
  async get(berichtsheft: string, jahr: number, kw: number) {
    const loading = await this.loadingCtrl.create({
      message: 'Lade Wochenbericht',
      translucent: true,
    });
    await loading.present();
    return this.http.get(`${ API_HOST }/api/v1/self/berichtsheft/${ berichtsheft }/wochenbericht/${ jahr }/${ kw }`)
    .pipe(
      finalize(() => loading.dismiss())
    ) as Observable<Wochenbericht>;
  }
  async create(berichtsheft: string, jahr: number, kw: number, templateId: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Erstelle Wochenbericht',
      translucent: true,
    });
    await loading.present();
    return this.http.post(`${ API_HOST }/api/v1/self/berichtsheft/${ berichtsheft }/wochenbericht/${ jahr }/${ kw }`, {
      templateId
    })
    .pipe(
      finalize(() => loading.dismiss())
    ) as Observable<any>;
  }
  async update(berichtsheft: string, wochenbericht: string, updateData: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Ändere Wochenbericht',
      translucent: true,
    });
    await loading.present();
    return this.http.put(`${ API_HOST }/api/v1/self/berichtsheft/${ berichtsheft }/wochenbericht/${ wochenbericht }`, updateData)
    .pipe(
      finalize(() => loading.dismiss())
    ) as Observable<any>;
  }
  async delete(berichtsheft: string, wochenbericht: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Lösche Wochenbericht',
      translucent: true,
    });
    await loading.present();
    return this.http.delete(`${ API_HOST }/api/v1/self/berichtsheft/${ berichtsheft }/wochenbericht/${ wochenbericht }`)
    .pipe(
      finalize(() => loading.dismiss())
    ) as Observable<any>;
  }
}

/*
=== LEGACY CODE ===
get: function(berichtsheft) {
  if (berichtsheft) {
    return $http.get(urlBase + 'self/berichtsheft/' + berichtsheft)
  } else {
    return $http.get(urlBase + 'self/berichtshefte')
  }
},
create: function(name) {
  return $http.post(urlBase + 'self/berichtsheft', {
    name: name
  })
},
update: function(uuid, updateData) {
  return $http.put(urlBase + 'self/berichtsheft/' + uuid, updateData)
},
delete: function(berichtsheft) {
  return $http.delete(urlBase + 'self/berichtsheft/' + berichtsheft)
},
*/
