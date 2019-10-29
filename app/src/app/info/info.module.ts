import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InfoPage } from './info.page';
import { MaterialModule } from '../material.module';

export const routerModuleForChild = RouterModule.forChild([
  {
    path: '',
    component: InfoPage
  }
]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    routerModuleForChild
  ],
  declarations: [InfoPage]
})
export class InfoPageModule {}
