import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './page/auth/auth.page.component';
import { BASE } from '../shared/constants/routing-paths.consts';

const authRoutes: Routes = [{ path: BASE.path, component: AuthPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
