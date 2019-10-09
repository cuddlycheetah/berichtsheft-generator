import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { API_HOST } from '../app.module';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import Vorlage from './vorlage';

@Injectable({
  providedIn: 'root'
})
export class APITemplatesService {

  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router
  ) { }
  async getGlobal() {
    const loading = await this.loadingCtrl.create({
      message: 'Lade betriebliche Vorlagen',
      translucent: true,
    });
    await loading.present();
    return this.http.get(`${ API_HOST }/api/v1/self/wochentemplates`)
    .pipe(
      finalize(() => loading.dismiss())
    ) as Observable<Vorlage[]>;
  }
  async getAll() {
    const loading = await this.loadingCtrl.create({
      message: 'Lade Vorlagen',
      translucent: true,
    });
    await loading.present();
    return this.http.get(`${ API_HOST }/api/v2/my/wochentemplate/`)
    .pipe(
      finalize(() => loading.dismiss())
    ) as Observable<Vorlage[]>;
  }
  async get(wochentemplate: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Lade Vorlage',
      translucent: true,
    });
    await loading.present();
    return this.http.get(`${ API_HOST }/api/v2/my/wochentemplate/${ wochentemplate }`)
    .pipe(
      finalize(() => loading.dismiss())
    ) as Observable<Vorlage>;
  }
  async create(name: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Erstelle Vorlage',
      translucent: true,
    });
    await loading.present();
    return this.http.post(`${ API_HOST }/api/v2/my/wochentemplate`, {
      name
    })
    .pipe(
      finalize(() => loading.dismiss())
    ) as Observable<any>;
  }
  async update(uuid: string, updateData: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Ändere Vorlage',
      translucent: true,
    });
    await loading.present();
    return this.http.put(`${ API_HOST }/api/v2/my/wochentemplate/${ uuid }`, updateData)
    .pipe(
      finalize(() => loading.dismiss())
    ) as Observable<any>;
  }
  async delete(berichtsheft: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Lösche Vorlage',
      translucent: true,
    });
    await loading.present();
    return this.http.delete(`${ API_HOST }/api/v2/my/wochentemplate/${ berichtsheft }`)
    .pipe(
      finalize(() => loading.dismiss())
    ) as Observable<any>;
  }
}
