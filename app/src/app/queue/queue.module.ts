import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QueuePage } from './queue.page';
import { MaterialModule } from '../material.module';
import { MomentModule } from 'angular2-moment';

export const routerModuleForChild = RouterModule.forChild([
  {
    path: '',
    component: QueuePage
  }
]);


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MomentModule,
    MaterialModule,
    routerModuleForChild
  ],
  declarations: [QueuePage]
})
export class QueuePageModule {}
