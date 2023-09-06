import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CORE_FEATURE_KEY, ICoreState } from './core.reducer';
import { getRouterSelectors } from '@ngrx/router-store';

export const selectCore =
  createFeatureSelector<{core: ICoreState}>(CORE_FEATURE_KEY);

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

export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectRouteDataParam, // factory function to select a route data param
  selectUrl, // select the current url
  selectTitle, // select the title if available
} = getRouterSelectors();
