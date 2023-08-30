import { createAction, props } from '@ngrx/store';
import { IShared } from '../../shared/interfaces/shared.interface';
import { Language } from '../../employees/models/cvs.mode';

interface ISharedLoadProps {
  departments: IShared[];
  specializations: IShared[];
  skills: IShared[];
  teamRoles: IShared[];
  responsibilities: IShared[];
  languages: Language[]
}

export const getSharedCollections = createAction(
  '[SharedCollections] Get all shared collections'
);

export const loadSharedCollectionsSuccess = createAction(
  '[SharedCollections] Load shared collections Success',
  props<ISharedLoadProps>()
);

export const loadSharedCollectionsFailure = createAction(
  '[SharedCollections] Load shared collections Failure',
  props<{ error: string }>()
);
