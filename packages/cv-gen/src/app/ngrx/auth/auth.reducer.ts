import { createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export const TOKEN_FEATURE_KEY = 'token';

export const initialAuthState = {
  accessToken: '',
  expires: 0,
};

export const AuthReducer = createReducer(
  initialAuthState,
  on(AuthActions.logInSuccess, (state, { tokenData }) => {
    return { ...state, ...tokenData };
  }),
  on(AuthActions.AuthFailure, (state) => ({ ...state }))
);
