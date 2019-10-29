import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';


export const routerModuleForRoot = RouterModule.forRoot([
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'main', canActivate: [ AuthGuard ], loadChildren: './main/main.module#MainPageModule' },
], { preloadingStrategy: PreloadAllModules });

@NgModule({
  imports: [
    routerModuleForRoot,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
