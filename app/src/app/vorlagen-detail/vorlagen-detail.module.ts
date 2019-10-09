import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VorlagenDetailPage } from './vorlagen-detail.page';
import { MaterialModule } from '../material.service';

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
    RouterModule.forChild(routes)
  ],
  declarations: [VorlagenDetailPage]
})
export class VorlagenDetailPageModule {}
