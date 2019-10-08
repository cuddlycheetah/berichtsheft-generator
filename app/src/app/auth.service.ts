import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authSubject = new BehaviorSubject(false);
  tokenValidationFailed = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService
  ) { }
  async init() {
  }
  async checkLocalStorageToken() {
    if (!this.storage.get('ACCESS_TOKEN')) {
      this.tokenValidationFailed.next(true);
      return; // * Dont Check if we dont have an Access Token
    }
    const loading = await this.loadingCtrl.create({
      message: 'Prüfe lokalen Token',
      translucent: true,
    });
    await loading.present();
    // STANDARD
    this.http.get('/api/v1/self/profile/').pipe(
      finalize(() => loading.dismiss())
    )
    .subscribe((res: any) => {
      if (!!res) {
        console.log('validated token', res);
        this.authSubject.next(true);
        this.router.navigate(['main']);
      }
    }, () => {
      this.tokenValidationFailed.next(true);
      this.logout();
    });
  }
  async getStatus() {
    await this.checkLocalStorageToken();
  }
  isAuthenticated() {
    return this.authSubject.value;
  }
  async login(data) {
    const loading = await this.loadingCtrl.create({
      message: 'Logging in',
      translucent: true,
    });
    await loading.present();
    return this.http.post(`/api/auth/login`, data)
    .pipe(
      finalize(() => loading.dismiss())
    )
    .subscribe(
      async (res: any) => {
        console.log('=> got response', res);
        if (!!res) {
          console.log('login success');
          await this.storage.set('ACCESS_TOKEN', res.token);
          await this.storage.set('EXPIRES_IN', res.expires);
          await this.storage.set('ACCESS_KEY', res.user.username);
          this.authSubject.next(true);
          this.router.navigate(['main']);
        }
      }, async (req) => {
        console.error('oopsie happened', req);
        const err = req.error;
        const alert = await this.alertCtrl.create({
          header: 'Login failed',
          message: err.alert || err,
          buttons: ['OK'],
        });
        alert.present();
    });
  }
  async logout() {
    await this.storage.remove('ACCESS_TOKEN');
    await this.storage.remove('ACCESS_KEY');
    await this.storage.remove('EXPIRES_IN');
    this.authSubject.next(false);
    // this.loggedInMitarbeiter.next(undefined);
    this.tokenValidationFailed.next(true);
    this.router.navigate(['auth']);
  }
}
