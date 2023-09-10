import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CvDto } from '../../employees/models/cvs.model';
import { EmployeeDto } from '../../employees/models/employee.model';
import { selectSelectedEmployee } from '../employees/employees.selectors';
import { CvsState, cvsAdapter } from './cvs.reducer';

export const selectCvs = createFeatureSelector<{ cvs: CvsState }>('common');

export const selectCvsState = createSelector(selectCvs, (state) => state.cvs);

const { selectAll, selectEntities } = cvsAdapter.getSelectors();

export const selectCvsLoaded = createSelector(
  selectCvsState,
  (state: CvsState) => state.loaded
);

export const selectCvsError = createSelector(
  selectCvsState,
  (state: CvsState) => state.error
);

export const selectAllCvs = createSelector(selectCvsState, (state: CvsState) =>
  selectAll(state)
);

export const selectCvsEntities = createSelector(
  selectCvsState,
  (state: CvsState) => selectEntities(state)
);

export const selectSelectedCv = createSelector(
  selectCvsState,
  (state: CvsState) => state.selectedCv
);

export const selectEmployeesCvs = createSelector(
  selectSelectedEmployee,
  selectAllCvs,
  (selectedEmployee: EmployeeDto, selectedCvs: CvDto[]) => {
    if (selectedEmployee && selectedCvs) {
      return selectedCvs.filter((cv) => cv.employeeId === selectedEmployee.id);
    }
    return [];
  }
);

export const selectNewEmployeesCvs = createSelector(
  selectEmployeesCvs,
  (newCvs: CvDto[]) => {
    if (newCvs) {
      return newCvs.filter((cv) => cv?.isNew);
    }
    return [];
  }
);

export const selectOldEmployeesCvs = createSelector(
  selectEmployeesCvs,
  (newCvs: CvDto[]) => {
    if (newCvs) {
      return newCvs.filter((cv) => !cv?.isNew);
    }
    return [];
  }
);
