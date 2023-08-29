import { createAction, props } from '@ngrx/store';
import { ICv } from '../../employees/models/cvs.mode';

export const getCvs = createAction('[Cvs Component] Get Cvs');

export const loadCvsSuccess = createAction(
  '[Cvs/API] Load Cvs Success',
  props<{ cvs: ICv[] }>()
);

export const loadCvsFailure = createAction(
  '[Cvs/API] Load Cvs Failure',
  props<{ error: string }>()
);
