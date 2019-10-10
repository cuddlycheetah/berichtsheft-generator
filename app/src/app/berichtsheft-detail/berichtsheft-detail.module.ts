import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BerichtsheftDetailPage } from './berichtsheft-detail.page';
import { MaterialModule } from '../material.service';
import { OwlDateTimeModule, OWL_DATE_TIME_LOCALE, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { MY_MOMENT_FORMATS } from '../app.module';
import { OwlMomentDateTimeModule, OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS } from 'ng-pick-datetime-moment';
import { KWSelectorComponent } from '../components/kwselector/kwselector.component';

const routes: Routes = [
  {
    path: '',
    component: BerichtsheftDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MaterialModule,
    OwlDateTimeModule,
    OwlMomentDateTimeModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'de' },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS },
  ],
  declarations: [
    BerichtsheftDetailPage,
    KWSelectorComponent
  ]
})
export class BerichtsheftDetailPageModule {}
