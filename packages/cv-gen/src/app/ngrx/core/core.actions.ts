import { createActionGroup, props } from '@ngrx/store';
import { Language } from '../../shared/enums/language.enum';
import { Theme } from '../../shared/enums/theme.enum';

export const CoreActions = createActionGroup({
  source: 'Core',
  events: {
    'Set theme': props<{ theme: Theme }>(),
    'Set language': props<{ language: Language }>(),
    'Set isLogin': props<{ isLogin: boolean }>(),
  },
});
