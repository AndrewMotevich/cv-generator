import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { rootRoutes } from './routes';

@NgModule({
  imports: [RouterModule.forRoot(rootRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
