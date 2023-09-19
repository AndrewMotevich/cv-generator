import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { Language } from '../../shared/enums/language.enum';
import { Theme } from '../../shared/enums/theme.enum';
import { IBreadcrumb } from '../../shared/interfaces/breadcrumbs.interface';
import * as CoreActions from './core.actions';
import * as CoreSelectors from './core.selectors';

@Injectable()
export class CoreFacade {
  private readonly store = inject(Store);

  public coreState$ = this.store.select(CoreSelectors.selectCoreState);

  public pageData$ = this.store.select(CoreSelectors.selectPageData);
  public breadcrumbs$ = this.store.select(CoreSelectors.selectBreadcrumbs);
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

  public setBreadcrumbs(data: {
    breadcrumbs: IBreadcrumb[];
    title: string;
    pageInfo: string;
  }) {
    this.store.dispatch(CoreActions.setBreadcrumbs({ data }));
  }
}
