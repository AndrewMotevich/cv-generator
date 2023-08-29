import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CVS_FEATURE_KEY,
  CvsState,
  cvsAdapter,
} from './cvs.reducer';

export const selectCvsState = createFeatureSelector<CvsState>(
  CVS_FEATURE_KEY
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

export const selectSelectedId = createSelector(
  selectCvsState,
  (state: CvsState) => state.selectedId
);

export const selectEntity = createSelector(
  selectCvsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
