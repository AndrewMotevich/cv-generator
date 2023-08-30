import { createAction, props } from '@ngrx/store';
import { Language } from '../../shared/enums/language.enum';
import { Theme } from '../../shared/enums/theme.enum';

export const setTheme = createAction(
  '[Core] Set theme', props<{ theme: Theme }>()
)
export const setLanguage = createAction(
  '[Core] Set language', props<{ language: Language }>()
)
export const setIsLogin = createAction(
  '[Core] Set isLogin', props<{ isLogin: boolean }>()
)
