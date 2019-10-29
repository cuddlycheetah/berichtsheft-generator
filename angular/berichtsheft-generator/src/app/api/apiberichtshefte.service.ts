import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { API_HOST } from './host';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Berichtsheft } from './berichtsheft';

@Injectable({
  providedIn: 'root'
})
export class APIBerichtshefteService {

  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router
  ) { }
  async getAll() {
    const loading = await this.loadingCtrl.create({
      message: 'Lade Berichtshefte',
      translucent: true,
    });
    await loading.present();
    return this.http.get(`${ API_HOST }/api/v1/self/berichtshefte`)
    .pipe(
      finalize(() => loading.dismiss())
    ) as Observable<Berichtsheft[]>;
  }
  async get(berichtsheft: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Lade Berichtsheft',
      translucent: true,
    });
    await loading.present();
    return this.http.get(`${ API_HOST }/api/v1/self/berichtsheft/${ berichtsheft }`)
    .pipe(
      finalize(() => loading.dismiss())
    ) as Observable<Berichtsheft>;
  }
  async create(name: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Erstelle Berichtsheft',
      translucent: true,
    });
    await loading.present();
    return this.http.post(`${ API_HOST }/api/v1/self/berichtsheft`, {
      name
    })
    .pipe(
      finalize(() => loading.dismiss())
    ) as Observable<any>;
  }
  async update(uuid: string, updateData: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Ändere Berichtsheft',
      translucent: true,
    });
    await loading.present();
    return this.http.put(`${ API_HOST }/api/v1/self/berichtsheft/${ uuid }`, updateData)
    .pipe(
      finalize(() => loading.dismiss())
    ) as Observable<any>;
  }
  async delete(berichtsheft: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Lösche Berichtsheft',
      translucent: true,
    });
    await loading.present();
    return this.http.delete(`${ API_HOST }/api/v1/self/berichtsheft/${ berichtsheft }`)
    .pipe(
      finalize(() => loading.dismiss())
    ) as Observable<any>;
  }
  // self/berichtsheft/' + berichtsheft + '/wochenbericht/' + jahr + '/' + kw
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
