import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AuthPage } from './auth.page';
import { MaterialModule } from '../material.module';

export const routerModuleForChild = RouterModule.forChild([
  {
    path: '',
    component: AuthPage
  }
]);
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    routerModuleForChild,
    MaterialModule,
  ],
  declarations: [AuthPage]
})
export class AuthPageModule {}
