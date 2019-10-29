import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VorlagenPage } from './vorlagen.page';
import { MaterialModule } from '../material.service';

export const routerModuleForChild = RouterModule.forChild([
  {
    path: '',
    component: VorlagenPage
  }
]);


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    routerModuleForChild
  ],
  declarations: [VorlagenPage]
})
export class VorlagenPageModule {}
