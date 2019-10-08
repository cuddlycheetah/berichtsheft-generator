import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { API_HOST } from '../app.module';
import { Observable } from 'rxjs';
import Betrieb from './betrieb';

@Injectable({
  providedIn: 'root'
})
export class APIBetriebService {
  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
  ) {
  }
  public getAll(): Observable<Betrieb[]> {
    return this.http.get(`${ API_HOST }/api/pub/betriebe`) as Observable<Betrieb[]>;
  }
}
