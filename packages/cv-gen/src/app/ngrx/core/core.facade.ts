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

  public selectCurrentRoute$ = this.store.select(CoreSelectors.selectCurrentRoute)
  public selectFragment$ = this.store.select(CoreSelectors.selectFragment)
  public selectQueryParams$ = this.store.select(CoreSelectors.selectQueryParams)
  public selectQueryParam$ = this.store.select(CoreSelectors.selectQueryParam)
  public selectRouteParams$ = this.store.select(CoreSelectors.selectRouteParams)
  public selectRouteParam$ = this.store.select(CoreSelectors.selectRouteParam)
  public selectRouteData$ = this.store.select(CoreSelectors.selectRouteData)
  public selectRouteDataParam$ = this.store.select(CoreSelectors.selectRouteDataParam)
  public selectUrl$ = this.store.select(CoreSelectors.selectUrl)
  public selectTitle$ = this.store.select(CoreSelectors.selectTitle)

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
