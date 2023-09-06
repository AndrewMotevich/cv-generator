import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as CoreActions from './core.actions';
import * as CoreSelectors from './core.selectors';
import { Theme } from '../../shared/enums/theme.enum';
import { Language } from '../../shared/enums/language.enum';

@Injectable()
export class CoreFacade {
  private readonly store = inject(Store);

  public coreState$ = this.store.select(CoreSelectors.selectCoreState);

  public theme$ = this.store.select(CoreSelectors.selectTheme);
  public language$ = this.store.select(CoreSelectors.selectLanguage);
  public isLogin$ = this.store.select(CoreSelectors.selectIsLogin);

  public selectCurrentRoute$ = this.store.select(CoreSelectors.selectCurrentRoute) // select the current route
  public selectFragment$ = this.store.select(CoreSelectors.selectFragment) // select the current route fragment
  public selectQueryParams$ = this.store.select(CoreSelectors.selectQueryParams) // select the current route query params
  public selectQueryParam$ = this.store.select(CoreSelectors.selectQueryParam) // factory function to select a query param
  public selectRouteParams$ = this.store.select(CoreSelectors.selectRouteParams) // select the current route params
  public selectRouteParam$ = this.store.select(CoreSelectors.selectRouteParam) // factory function to select a route param
  public selectRouteData$ = this.store.select(CoreSelectors.selectRouteData) // select the current route data
  public selectRouteDataParam$ = this.store.select(CoreSelectors.selectRouteDataParam) // factory function to select a route data param
  public selectUrl$ = this.store.select(CoreSelectors.selectUrl) // select the current url
  public selectTitle$ = this.store.select(CoreSelectors.selectTitle) // select the title if available

  public setTheme(theme: Theme) {
    this.store.dispatch(CoreActions.setTheme({ theme }));
  }

  public setLanguage(language: Language) {
    this.store.dispatch(CoreActions.setLanguage({ language }));
  }

  public setIsLogin(isLogin: boolean) {
    this.store.dispatch(CoreActions.setIsLogin({ isLogin }));
  }
}
