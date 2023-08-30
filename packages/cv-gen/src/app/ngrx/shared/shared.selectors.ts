import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SHARED_FEATURE_KEY } from './shared.reducer';
import { ISharedAll } from '../../shared/interfaces/shared.interfaces';

export const selectAllSharedState =
  createFeatureSelector<ISharedAll>(SHARED_FEATURE_KEY);

export const selectDepartments = createSelector(
  selectAllSharedState,
  (state) => state.departments
);

export const selectSpecializations = createSelector(
  selectAllSharedState,
  (state) => state.specializations
);

export const selectSkills = createSelector(
  selectAllSharedState,
  (state) => state.skills
);

export const selectTeamRoles = createSelector(
  selectAllSharedState,
  (state) => state.teamRoles
);

export const selectResponsibilities = createSelector(
  selectAllSharedState,
  (state) => state.responsibilities
);

export const selectLanguages = createSelector(
  selectAllSharedState,
  (state) => state.languages
);
