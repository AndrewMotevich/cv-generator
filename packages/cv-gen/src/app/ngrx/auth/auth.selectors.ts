import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITokenData } from '../../shared/interfaces/token-data.interface';

export const selectToken = createFeatureSelector<{ token: ITokenData }>(
  'core'
);

export const selectTokenState = createSelector(
  selectToken,
  (state) => state.token
);
