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
    console.log('CVS: ', cvs);
    return cvsAdapter.setAll(cvs, { ...state, loaded: true });
  }),
  on(CvsActions.loadCvByIdSuccess, (state, { cv }) => {
    return { ...state, selectedCv: cv };
  }),

  on(CvsActions.addCvInStore, (state, { cv }) => {
    return cvsAdapter.addOne(cv, state);
  }),

  on(CvsActions.updateCvInStore, (state, { cv }) => {
    return cvsAdapter.setOne(cv, state);
  }),

  on(CvsActions.deleteCvInStore, (state, { id }) => {
    return cvsAdapter.removeOne(id, state);
  })
);
