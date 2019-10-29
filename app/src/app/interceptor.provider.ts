import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Observable, from, throwError } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorProvider implements HttpInterceptor {
  constructor(
    private router: Router,
    public toastController: ToastController,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService
  ) { }

  // Intercepts all HTTP requests!
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storage.get('ACCESS_TOKEN');
    const tokenKey = this.storage.get('ACCESS_KEY');

    if (!!token && !!tokenKey) {
      request = request.clone({
        setHeaders: {
          'X-Access-Token': token,
          'X-Key': tokenKey,
        }
      });
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (error.error.success === false) {
            this.presentToast('Login failed');
          } else {
            this.router.navigate(['auth']);
          }
        }
        return throwError(error);
      })
    );
    /*return from(async () => {
      let token = await this.storage.get('ACCESS_TOKEN');

      const clonedReq = this.addToken(request, token);
      return next.handle(clonedReq);
    });*/
    /*
    let promise = this.storage.get('ACCESS_TOKEN');
    return Observable.defer(promise)
    .mergeMap(token => {
      let clonedReq = this.addToken(request, token);
      return next.handle(clonedReq).pipe(
          catchError(error => {
            //  let msg = error.message;

              let alert = this.alertCtrl.create({
                  title: error.name,
                  message: msg,
                  buttons: ['OK']
              });
              alert.present();

              // Pass the error to the caller of the function
              return throwError(error);
          })
      );
    });*/
  }

  // Adds the token to your headers if it exists
  private addToken(request: HttpRequest<any>, token: any) {
    if (token) {
      let clone: HttpRequest<any>;
      clone = request.clone({
        setHeaders: {
          /*Accept: `application/json`,
          'Content-Type': `application/json`,*/
          Authorization: token,
        }
      });
      return clone;
    }

    return request;
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}
