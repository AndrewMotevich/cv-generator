import { createAction, props } from '@ngrx/store';
import { ITokenData } from '../../shared/interfaces/token-data.interface';
import { ICredentials } from '../../shared/interfaces/credentials.interface';

export const logIn = createAction(
  '[Auth] Log In',
  props<{ credentials: ICredentials }>()
);

export const refreshToken = createAction(
  '[Auth] Refresh token',
);

export const logInSuccess = createAction(
  '[Auth] Log In Success',
  props<{ tokenData: ITokenData }>()
);
