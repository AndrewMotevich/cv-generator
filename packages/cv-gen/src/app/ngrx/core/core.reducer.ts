import { createReducer, on } from '@ngrx/store';
import { Language } from '../../shared/enums/language.enum';
import { Theme } from '../../shared/enums/theme.enum';
import * as CoreActions from './core.actions';
import { IBreadcrumb } from '../../shared/interfaces/breadcrumbs.interface';

export const CORE_FEATURE_KEY = 'core';

export interface ICoreState {
  pageData: { title: string; pageInfo: string };
  breadcrumbs: IBreadcrumb[];
  theme: Theme;
  language: Language;
  isLogin: boolean;
}

export const initialState: ICoreState = {
  pageData: { title: '', pageInfo: '' },
  breadcrumbs: [],
  theme: Theme.dark,
  language: Language.en,
  isLogin: false,
};

export const CoreReducer = createReducer(
  initialState,
  on(CoreActions.setTheme, (state, action) => ({
    ...state,
    theme: action.theme,
  })),
  on(CoreActions.setLanguage, (state, action) => ({
    ...state,
    language: action.language,
  })),
  on(CoreActions.setIsLogin, (state, action) => ({
    ...state,
    isLogin: action.isLogin,
  })),
  on(CoreActions.setBreadcrumbs, (state, action) => {
    const modBreadcrumb: IBreadcrumb[] = [
      { label: 'Home', route: '/' },
      ...action.data.breadcrumbs,
    ];
    return {
      ...state,
      breadcrumbs: modBreadcrumb,
      pageData: { pageInfo: action.data.pageInfo, title: action.data.title },
    };
  })
);
