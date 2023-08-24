import { createAction, props } from '@ngrx/store';
import { ITokenCredentials as ITokenData } from './auth.reducer';

export const logIn = createAction(
  '[Auth] Init',
  props<{ credentials: { email: string; password: string } }>()
);

export const refreshToken = createAction(
  '[Auth] Refresh token',
);

export const logInSuccess = createAction(
  '[auth/API] Auth Success',
  props<{ credentials: ITokenData }>()
);
