import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { homeRoutes } from '../routes';

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
