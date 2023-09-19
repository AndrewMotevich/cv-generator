import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CORE_FEATURE_KEY, ICoreState } from './core.reducer';

export const selectCore = createFeatureSelector<{ core: ICoreState }>(
  CORE_FEATURE_KEY
);

export const selectCoreState = createSelector(
  selectCore,
  (state) => state.core
);

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

export const selectBreadcrumbs = createSelector(
  selectCoreState,
  (state) => state.breadcrumbs
);

export const selectPageData = createSelector(
  selectCoreState,
  (state) => state.pageData
);
