import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import * as CvsActions from './cvs.actions';
import { ICv } from '../../employees/models/cvs.model';

export const CVS_FEATURE_KEY = 'cvs';

export interface CvsState extends EntityState<ICv> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null;
}

export const cvsAdapter: EntityAdapter<ICv> =
  createEntityAdapter<ICv>();

export const initialCvsState: CvsState =
  cvsAdapter.getInitialState({
    loaded: false,
  });

export const CvsReducer = createReducer(
  initialCvsState,
  on(CvsActions.loadCvsSuccess, (state, { cvs }) => {
    console.log("CVS: ", cvs);
    return cvsAdapter.setAll(cvs, { ...state, loaded: true });
  }),
  on(CvsActions.loadCvsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
