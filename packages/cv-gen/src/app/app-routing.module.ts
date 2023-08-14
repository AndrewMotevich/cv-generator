import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutPageComponent } from './shared/pages/about/about.page.component';
import { NotFoundPageComponent } from './shared/pages/not-found/not-found.page.component';

import {
  ABOUT,
  AUTH,
  BASE,
  EMPLOYEES,
  HOME,
} from './shared/constants/routing-paths.consts';

const rootRoutes: Routes = [
  {
    path: AUTH.path,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: HOME.path,
    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
  },
  { path: ABOUT.path, component: AboutPageComponent },
  { path: BASE.path, redirectTo: EMPLOYEES.path, pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(rootRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
