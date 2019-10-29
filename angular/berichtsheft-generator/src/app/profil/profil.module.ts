import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilPage } from './profil.page';
import { MaterialModule } from '../material.module';

export const routerModuleForChild = RouterModule.forChild([
  {
    path: '',
    component: ProfilPage
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
  declarations: [ProfilPage]
})
export class ProfilPageModule {}
