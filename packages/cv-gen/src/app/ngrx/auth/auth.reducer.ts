import { createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export const TOKEN_FEATURE_KEY = 'token';

export interface ITokenCredentials {
    access_token: string,
    exp: string
}

export const initialAuthState = {
    access_token: '',
    exp: ''
}

export const AuthReducer = createReducer(
  initialAuthState,
  on(AuthActions.logInSuccess , (state, { credentials }) => {
    return {...state, ...credentials}
  }),
);
