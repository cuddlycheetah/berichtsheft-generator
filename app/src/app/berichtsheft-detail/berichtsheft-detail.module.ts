import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BerichtsheftDetailPage } from './berichtsheft-detail.page';
import { MaterialModule } from '../material.service';
import { OwlDateTimeModule, OWL_DATE_TIME_LOCALE, OWL_DATE_TIME_FORMATS, DateTimeAdapter } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule, OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS } from 'ng-pick-datetime-moment';
import { MinuteCountDateTimeAdapter } from '../adapter/minuteCountDateAdapter';

export const routerModuleForChild = RouterModule.forChild([
  {
    path: '',
    component: BerichtsheftDetailPage
  }
]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MaterialModule,
    OwlDateTimeModule,
    OwlMomentDateTimeModule,
    routerModuleForChild
  ],
  providers: [
    { provide: DateTimeAdapter, useClass: MinuteCountDateTimeAdapter },
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'de' },
    { provide: OWL_DATE_TIME_FORMATS, useValue: {
      parseInput: 'l LT',
      fullPickerInput: 'l LT',
      datePickerInput: 'l',
      timePickerInput: 'LT',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
     },
    },
  ],
  declarations: [
    BerichtsheftDetailPage,
  ]
})
export class BerichtsheftDetailPageModule {}
