import { createFeatureSelector } from '@ngrx/store';
import { ITokenCredentials, TOKEN_FEATURE_KEY } from './auth.reducer';


export const selectTokenState = createFeatureSelector<ITokenCredentials>(
  TOKEN_FEATURE_KEY
);

