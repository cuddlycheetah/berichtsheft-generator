import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BerichtsheftPage } from './berichtsheft.page';
import { MaterialModule } from '../material.service';

const routes: Routes = [
  {
    path: '',
    component: BerichtsheftPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BerichtsheftPage]
})
export class BerichtsheftPageModule {}
