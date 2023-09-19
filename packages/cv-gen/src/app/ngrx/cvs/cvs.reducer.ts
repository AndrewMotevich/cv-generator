import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { CvDto } from '../../employees/models/cvs.model';
import * as CvsActions from './cvs.actions';

export const CVS_FEATURE_KEY = 'cvs';

export interface CvsState extends EntityState<CvDto> {
  selectedCv: CvDto | null;
  loaded: boolean;
  error: string | null;
}

export const cvsAdapter: EntityAdapter<CvDto> = createEntityAdapter<CvDto>();

export const initialCvsState: CvsState = cvsAdapter.getInitialState({
  selectedCv: null,
  loaded: false,
  error: null,
});

export const CvsReducer = createReducer(
  initialCvsState,
  on(CvsActions.loadCvsSuccess, (state, { cvs }) => {
    return cvsAdapter.setAll(cvs, { ...state, loaded: true });
  }),

  on(CvsActions.setSelectedCvById, (state, { id }) => {
    const selectedCv = state.entities[id] || null;
    return { ...state, selectedCv };
  }),

  on(CvsActions.loadCvByIdSuccess, (state, { cv }) => {
    return { ...state, selectedCv: cv };
  }),

  on(CvsActions.addCvInStore, (state, { cv }) => {
    return cvsAdapter.addOne(cv, state);
  }),

  on(CvsActions.updateCvInStore, (state, { update }) => {
    return cvsAdapter.updateOne(update, state);
  }),

  on(CvsActions.addEmployeeIdToNewCvs, (state, { employeeId }) => {
    const newCvs = Object.values(
      cvsAdapter.getSelectors().selectEntities(state)
    ).filter((cv) => cv.isNew);
    const changes = newCvs.map((cv) => ({
      id: cv.id,
      changes: { employeeId },
    }));
    return cvsAdapter.updateMany(changes, state);
  }),

  on(CvsActions.deleteCvInStore, (state, { id }) => {
    return cvsAdapter.removeOne(id, state);
  }),

  on(CvsActions.clearSelectedCv, (state) => {
    return { ...state, selectedCv: null };
  })
);
