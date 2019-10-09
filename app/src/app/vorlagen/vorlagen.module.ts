import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VorlagenPage } from './vorlagen.page';
import { MaterialModule } from '../material.service';

const routes: Routes = [
  {
    path: '',
    component: VorlagenPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VorlagenPage]
})
export class VorlagenPageModule {}
