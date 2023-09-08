import { createReducer, on } from '@ngrx/store';
import * as SharedActions from './shared.actions';
import { ISharedAll } from '../../shared/interfaces/shared.interfaces';

export const SHARED_FEATURE_KEY = 'shared';

export const initialState: ISharedAll = {
  departments: [],
  specializations: [],
  skills: [],
  teamRoles: [],
  responsibilities: [],
  languages: [],
};

export const SharedReducer = createReducer(
  initialState,
  on(SharedActions.loadAllSharedSuccess, (state, action) => {
    return {
      ...state,
      ...action.sharedCollections,
    };
  })
);
