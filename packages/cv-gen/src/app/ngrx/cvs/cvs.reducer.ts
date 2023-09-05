import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import * as CvsActions from './cvs.actions';
import { CvDto, ICv } from '../../employees/models/cvs.model';

export const CVS_FEATURE_KEY = 'cvs';

export interface CvsState extends EntityState<ICv> {
  selectedCv: CvDto;
  loaded: boolean;
  error: string | null;
}

export const cvsAdapter: EntityAdapter<ICv> = createEntityAdapter<ICv>();

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
  on(CvsActions.loadCvsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(CvsActions.clearSelectedCv, (state) => {
    return { ...state, selectedCv: null };
  })
);
