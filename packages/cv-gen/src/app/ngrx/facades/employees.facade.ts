import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as EmployeesActions from '../actions/employees.actions';
// import * as EmployeesFeature from '../reducers/employees.reducer';
import * as EmployeesSelectors from '../selectors/employees.selectors';

@Injectable()
export class EmployeesFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(EmployeesSelectors.selectEmployeesLoaded));
  allEmployees$ = this.store.pipe(
    select(EmployeesSelectors.selectAllEmployees)
  );
  selectedEmployees$ = this.store.pipe(select(EmployeesSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    console.log('facade');
    this.store.dispatch(EmployeesActions.initEmployees());
  }
}
