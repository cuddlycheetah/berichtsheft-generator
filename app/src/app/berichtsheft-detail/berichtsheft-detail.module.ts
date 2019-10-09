import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BerichtsheftDetailPage } from './berichtsheft-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BerichtsheftDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BerichtsheftDetailPage]
})
export class BerichtsheftDetailPageModule {}
