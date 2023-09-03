import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CvsState,
  cvsAdapter
} from './cvs.reducer';

export const selectCvs = createFeatureSelector<{ cvs: CvsState}>(
  'common'
);

export const selectCvsState = createSelector(
  selectCvs,
  (state) => state.cvs
);

const { selectAll, selectEntities } = cvsAdapter.getSelectors();

export const selectCvsLoaded = createSelector(
  selectCvsState,
  (state: CvsState) => state.loaded
);

export const selectCvsError = createSelector(
  selectCvsState,
  (state: CvsState) => state.error
);

export const selectAllCvs = createSelector(
  selectCvsState,
  (state: CvsState) => selectAll(state)
);

export const selectCvsEntities = createSelector(
  selectCvsState,
  (state: CvsState) => selectEntities(state)
);

export const selectSelectedCv = createSelector(
  selectCvsState,
  (state: CvsState) => state.selectedCv
);

