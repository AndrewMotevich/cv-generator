import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { CoreActions } from './core.actions';
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
