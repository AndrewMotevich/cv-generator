import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as EmployeesActions from './employees.actions';
import * as EmployeesSelectors from './employees.selectors';
import { EmployeeDto } from '../../employees/models/employee.model';

@Injectable()
export class EmployeesFacade {
  private readonly store = inject(Store);

  public loaded$ = this.store.pipe(
    select(EmployeesSelectors.selectEmployeesLoaded)
  );

  public employeesList$ = this.store.pipe(
    select(EmployeesSelectors.selectAllEmployees)
  );

  public selectedEmployee$ = this.store.pipe(
    select(EmployeesSelectors.selectSelectedEmployee)
  );

  public loadEmployees() {
    this.store.dispatch(EmployeesActions.getEmployees());
  }

  public addEmployee(employee: EmployeeDto) {
    this.store.dispatch(EmployeesActions.addEmployee({ employee }));
  }

  public getEmployeeById(id: number) {
    this.store.dispatch(EmployeesActions.getEmployeeById({ id }));
  }

  public setSelectedEmployee(employee: EmployeeDto) {
    this.store.dispatch(EmployeesActions.loadEmployeeByIdSuccess({ employee }));
  }

  public updateEmployee(id: number, employee: EmployeeDto) {
    this.store.dispatch(EmployeesActions.updateEmployee({ id, employee }));
  }

  public deleteEmployee(id: number) {
    this.store.dispatch(EmployeesActions.deleteEmployee({ id }));
  }

  public setLoadedFalse() {
    this.store.dispatch(EmployeesActions.setLoadedFalse());
  }

  public setLoadedTrue() {
    this.store.dispatch(EmployeesActions.setLoadedTrue());
  }
}
