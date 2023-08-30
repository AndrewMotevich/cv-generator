import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  EmployeesState,
  employeesAdapter
} from './employees.reducer';

export const selectEmployees = createFeatureSelector<{
  employees: EmployeesState;
}>('common');

export const selectEmployeesState = createSelector(
  selectEmployees,
  (state) => state.employees
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
