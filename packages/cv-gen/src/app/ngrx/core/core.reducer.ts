import { createReducer, on } from '@ngrx/store';
import { Language } from '../../shared/enums/language.enum';
import { Theme } from '../../shared/enums/theme.enum';
import { CoreActions } from './core.actions';

export const CORE_FEATURE_KEY = 'core';

export interface ICoreState {
  theme: Theme;
  language: Language;
  isLogin: boolean;
}

export const initialState: ICoreState = {
  theme: Theme.dark,
  language: Language.en,
  isLogin: false,
};

export const coreReducer = createReducer(
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
  }))
);
