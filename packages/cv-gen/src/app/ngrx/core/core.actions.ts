import { createAction, props } from '@ngrx/store';
import { Language } from '../../shared/enums/language.enum';
import { Theme } from '../../shared/enums/theme.enum';
import { IBreadcrumb } from '../../shared/interfaces/breadcrumbs.interface';

export const setTheme = createAction(
  '[Core] Set theme',
  props<{ theme: Theme }>()
);
export const setLanguage = createAction(
  '[Core] Set language',
  props<{ language: Language }>()
);
export const setIsLogin = createAction(
  '[Core] Set isLogin',
  props<{ isLogin: boolean }>()
);

export const setBreadcrumbs = createAction(
  '[Core] Set breadcrumbs',
  props<{ breadcrumbs: IBreadcrumb[] }>()
);
