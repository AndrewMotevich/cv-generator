import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  EMPLOYEES_FEATURE_KEY,
  EmployeesState,
  employeesAdapter,
} from './employees.reducer';

// Lookup the 'Employees' feature state managed by NgRx
export const selectEmployeesState = createFeatureSelector<EmployeesState>(
  EMPLOYEES_FEATURE_KEY
);

const { selectAll, selectEntities } = employeesAdapter.getSelectors();

export const selectEmployeesLoaded = createSelector(
  selectEmployeesState,
  (state: EmployeesState) => state.loaded
);

export const selectEmployeesError = createSelector(
  selectEmployeesState,
  (state: EmployeesState) => state.error
);

export const selectAllEmployees = createSelector(
  selectEmployeesState,
  (state: EmployeesState) => selectAll(state)
);

export const selectEmployeesEntities = createSelector(
  selectEmployeesState,
  (state: EmployeesState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectEmployeesState,
  (state: EmployeesState) => state.selectedId
);

export const selectEntity = createSelector(
  selectEmployeesEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
