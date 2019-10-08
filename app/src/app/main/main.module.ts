import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'info',
        children: [
          { path: '', loadChildren: '../info/info.module#InfoPageModule' },
        ]
      },
      {
        path: 'berichtsheft',
        children: [
          { path: '', loadChildren: '../berichtsheft/berichtsheft.module#BerichtsheftPageModule' },
        ]
      },
      {
        path: 'vorlagen',
        children: [
          { path: '', loadChildren: '../vorlagen/vorlagen.module#VorlagenPageModule' },
        ]
      },
      {
        path: 'profil',
        children: [
          { path: '', loadChildren: '../profil/profil.module#ProfilPageModule' },
        ]
      },
      {
        path: 'queue',
        children: [
          { path: '', loadChildren: '../queue/queue.module#QueuePageModule' },
        ]
      },
      {
        path: '',
        redirectTo: '/main/info',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/main/info',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MainPage]
})
export class MainPageModule {}
