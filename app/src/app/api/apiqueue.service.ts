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
        if (!!data.waiting) {
          socketData.queueData.waiting = data.waiting;
        }
        if (!!data.queue) {
          socketData.queueData.queue = data.queue;
        }
        observer.next(socketData);
      });
      this.socket.on('authenticated', (data) => {
        socketData.connectionState = 'Authentifiziert';
        this.socket.emit('sub:queue');
        observer.next(socketData);
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
}
