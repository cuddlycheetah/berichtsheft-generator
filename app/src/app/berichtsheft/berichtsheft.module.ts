import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BerichtsheftPage, EditBereichDialogComponent } from './berichtsheft.page';
import { MaterialModule } from '../material.service';
import { KWSelectorComponent } from '../components/kwselector/kwselector.component';

const routes: Routes = [
  {
    path: '',
    component: BerichtsheftPage
  }
];

@NgModule({
  entryComponents: [EditBereichDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BerichtsheftPage, KWSelectorComponent, EditBereichDialogComponent ]
})
export class BerichtsheftPageModule {}
