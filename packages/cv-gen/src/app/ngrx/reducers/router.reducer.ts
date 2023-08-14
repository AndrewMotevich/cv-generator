import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

export const reducers: ActionReducerMap<unknown> = {
  router: routerReducer,
};
