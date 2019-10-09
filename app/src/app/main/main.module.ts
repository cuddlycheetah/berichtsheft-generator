import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MainPage } from './main.page';
import { VorlagenDetailResolveService } from '../vorlagen-detail/vorlagen-detail-resolve.service';
import { BerichtsheftDetailResolveService } from '../berichtsheft-detail/berichtsheft-detail-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      // * Information (logo button)
      {
        path: 'info',
        children: [
          { path: '', loadChildren: '../info/info.module#InfoPageModule' },
        ]
      },
      // * PDFs
      {
        path: 'queue',
        children: [
          { path: '', loadChildren: '../queue/queue.module#QueuePageModule' },
        ]
      },
      // * Berichtsheft
      {
        path: 'berichtsheft',
        children: [
          { path: '', loadChildren: '../berichtsheft/berichtsheft.module#BerichtsheftPageModule' },
        ]
      },
      {
        path: 'berichtsheft@/:berichtsheft',
        children: [
          { path: '', loadChildren: '../berichtsheft-detail/berichtsheft-detail.module#BerichtsheftDetailPageModule',
          resolve: { berichtsheft: BerichtsheftDetailResolveService } },
        ]
      },
      // * Vorlagen
      {
        path: 'vorlagen',
        children: [
          { path: '', loadChildren: '../vorlagen/vorlagen.module#VorlagenPageModule' },
        ]
      },
      {
        path: 'vorlagen@/:vorlage',
        children: [
          { path: '', loadChildren: '../vorlagen-detail/vorlagen-detail.module#VorlagenDetailPageModule',
            resolve: { vorlage: VorlagenDetailResolveService } },
        ]
      },
      // * Profil
      {
        path: 'profil',
        children: [
          { path: '', loadChildren: '../profil/profil.module#ProfilPageModule' },
        ]
      },

      // ! else
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
  declarations: [MainPage],
  providers: [
    VorlagenDetailResolveService,
    BerichtsheftDetailResolveService
  ],
})
export class MainPageModule {}
