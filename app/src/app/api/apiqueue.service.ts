import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { API_HOST } from '../app.module';
import { finalize } from 'rxjs/operators';

import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Observable, forkJoin, of } from 'rxjs';
import * as io from 'socket.io-client';
import { mergeMap, switchMap } from 'rxjs/operators';
function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

@Injectable({
  providedIn: 'root'
})
export class APIQueueService {
  private socket;
  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService
  ) { }
  private queueFilter(cuck) {
    console.log(cuck);
    const NOW = new Date().valueOf();
    cuck.sort((a, b) => new Date(a.auftragTime).valueOf() < new Date(b.auftragTime).valueOf()); // sorting
    cuck = cuck.filter(e => {
      const deletionTime = new Date(e.auftragTime);
      deletionTime.setDate(deletionTime.getDate() + 1);
      return deletionTime.valueOf() > NOW;
    }); // remove older than 24h
    cuck = cuck.filter(e => (!!e.auftrag ) || (!e.auftrag && e.status !== 2)); // filter done render entrys by others
    cuck = cuck.map((e) => {
      return (!!e.auftrag) || (!e.auftrag && e.status !== 2) ? e : false;
    });
    cuck = cuck.reduce((total, curr, index) => {
      if (cuck[index - 1] === curr && curr === false) {
        total.data[total.realIndex]++;
      } else {
        total.realIndex = index;
        total.data.push(!!curr ? curr : 1);
      }
      return total;
    }, {
      data: [],
      realIndex: 0,
    }).data;
    cuck = cuck.map((e) => {
      if (!!e.name) { e.name = e.name.substring(e.name.indexOf('|') + 2); }
      if (!!e.auftragTime) {
        e.deletionTime = new Date(e.auftragTime);
        e.deletionTime.setDate(e.deletionTime.getDate() + 1);
      }
      return typeof(e) === 'number' ? { waitCount: e } : e;
    });
    return cuck;
  }
  getSocket() {
    const observable = new Observable(observer => {
      this.socket = io('https://berichte.sch.umann.it/');
      const socketData = {
        connectionState: 'Unbekannt',
        queueData: {
          queue: [],
          waiting: [],
        },
      };
      this.socket.on('queuedata', (data) => {
        socketData.connectionState = 'Verbunden';
        if (!!data.waiting) {
          socketData.queueData.waiting = data.waiting;
          console.log(data.waiting);
        }
        if (!!data.queue) {
          socketData.queueData.queue = this.queueFilter(data.queue);
        }
        console.log(data, socketData.queueData.queue);
        observer.next(socketData);
      });
      this.socket.on('authenticated', (data) => {
        socketData.connectionState = 'Authentifiziert';
        observer.next(socketData);
        this.socket.emit('sub:queue');
      });
      // Authenticate via Token
      this.socket.emit('authentication', {
        accessToken: this.storage.get('ACCESS_TOKEN'),
        key: this.storage.get('ACCESS_KEY'),
      });

      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  async createEntry(wochenbericht: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Exportiere Tagesbericht',
      translucent: true,
    });
    await loading.present();
    return this.http.post(`${ API_HOST }/api/v1/queue/${ wochenbericht }`, {})
    .pipe(
      finalize(() => loading.dismiss())
    ) as Observable<any>;
  }
}
