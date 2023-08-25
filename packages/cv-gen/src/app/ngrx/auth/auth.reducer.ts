import { createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export const TOKEN_FEATURE_KEY = 'token';

export const initialAuthState = {
    accessToken: '',
    expires: ''
}

export const AuthReducer = createReducer(
  initialAuthState,
  on(AuthActions.logInSuccess , (state, { tokenData }) => {
    return {...state, ...tokenData}
  }),
);
