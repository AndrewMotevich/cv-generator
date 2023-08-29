import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as EmployeesActions from './employees.actions';
// import * as EmployeesFeature from '../reducers/employees.reducer';
import * as EmployeesSelectors from './employees.selectors';

@Injectable()
export class EmployeesFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(EmployeesSelectors.selectEmployeesLoaded));

  allEmployees$ = this.store.pipe(
    select(EmployeesSelectors.selectAllEmployees)
  );

  selectedEmployees$ = this.store.pipe(select(EmployeesSelectors.selectEntity));

  getEmployees() {
    this.store.dispatch(EmployeesActions.getEmployees());
  }
}
