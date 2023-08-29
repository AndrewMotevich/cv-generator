import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CORE_FEATURE_KEY, ICoreState } from './core.reducer';

export const selectCoreState =
  createFeatureSelector<ICoreState>(CORE_FEATURE_KEY);

export const selectLanguage = createSelector(
  selectCoreState,
  (state) => state.language
);
export const selectTheme = createSelector(
  selectCoreState,
  (state) => state.theme
);
export const selectIsLogin = createSelector(
  selectCoreState,
  (state) => state.isLogin
);
