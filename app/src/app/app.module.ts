import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MomentModule } from 'angular2-moment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { OwlDateTimeModule, OWL_DATE_TIME_LOCALE, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule, OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS } from 'ng-pick-datetime-moment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InterceptorProvider } from './interceptor.service';
import { StorageServiceModule} from 'angular-webstorage-service';
import { MaterialModule } from './material.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

export const API_HOST = ''; // 'https://berichte.sch.umann.it';
export const MY_MOMENT_FORMATS = {
  parseInput: 'l LT',
  fullPickerInput: 'l LT',
  datePickerInput: 'l',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    OwlDateTimeModule,
    OwlMomentDateTimeModule,
    MomentModule,
    MaterialModule,
    StorageServiceModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    { provide: OWL_DATE_TIME_LOCALE, useValue: 'de' },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS },
    { provide: OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
