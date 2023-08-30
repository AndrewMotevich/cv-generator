import { createAction, props } from '@ngrx/store';
import { ISharedAll } from '../../shared/interfaces/shared.interfaces';



export const getAllShared = createAction(
  '[AllShared] Get all shared collections'
);

export const loadAllSharedSuccess = createAction(
  '[AllShared] Load shared collections Success',
  props<{ sharedCollections: ISharedAll}>()
);

export const loadAllSharedFailure = createAction(
  '[AllShared] Load shared collections Failure',
  props<{ error: string }>()
);
