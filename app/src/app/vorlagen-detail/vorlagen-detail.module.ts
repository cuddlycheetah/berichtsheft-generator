import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VorlagenDetailPage } from './vorlagen-detail.page';

const routes: Routes = [
  {
    path: '',
    component: VorlagenDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VorlagenDetailPage]
})
export class VorlagenDetailPageModule {}
