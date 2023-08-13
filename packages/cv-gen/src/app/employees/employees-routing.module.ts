import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { employeesRoutes } from '../routes';

@NgModule({
  imports: [RouterModule.forChild(employeesRoutes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
