import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BerichtsheftPage, EditBereichDialogComponent } from './berichtsheft.page';
import { MaterialModule } from '../material.module';
import { KWSelectorComponent } from '../components/kwselector/kwselector.component';


export const routerModuleForChild = RouterModule.forChild([
  {
    path: '',
    component: BerichtsheftPage
  }
]);
@NgModule({
  entryComponents: [EditBereichDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    IonicModule,
    routerModuleForChild
  ],
  declarations: [BerichtsheftPage, KWSelectorComponent, EditBereichDialogComponent ]
})
export class BerichtsheftPageModule {}
