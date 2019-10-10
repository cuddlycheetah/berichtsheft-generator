import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VorlagenDetailPage } from './vorlagen-detail.page';
import { MaterialModule } from '../material.service';
import { OwlDateTimeModule, OWL_DATE_TIME_LOCALE, OWL_DATE_TIME_FORMATS, DateTimeAdapter } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
import { MY_MOMENT_FORMATS } from '../app.module';
import { MinuteCountDateTimeAdapter } from '../adapter/minuteCountDateAdapter';

const routes: Routes = [
  {
    path: '',
    component: VorlagenDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    OwlDateTimeModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    { provide: DateTimeAdapter, useClass: MinuteCountDateTimeAdapter },
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'de' },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS },
  ],
  declarations: [VorlagenDetailPage]
})
export class VorlagenDetailPageModule {}
