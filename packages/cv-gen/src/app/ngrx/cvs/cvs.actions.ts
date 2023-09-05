import { createAction, props } from '@ngrx/store';
import { CvDto, ICv } from '../../employees/models/cvs.model';

//Get Cvs
export const getCvs = createAction('[Cvs/Component] Get Cvs');

export const loadCvsSuccess = createAction(
  '[Cvs/API] Load Cvs Success',
  props<{ cvs: ICv[] }>()
);

export const loadCvsFailure = createAction(
  '[Cvs/API] Load Cvs Failure',
  props<{ error: string }>()
);

//Get selected cv by Id
export const getCvById = createAction(
  '[Cvs/Page] Get selected Cv by id',
  props<{ id: number }>()
);

export const loadCvByIdSuccess = createAction(
  '[Cvs/API] Load selected Cv by id Success',
  props<{ cv: CvDto }>()
);

export const loadCvByIdFailure = createAction(
  '[Cvs/API] Load selected Cv by id Failure',
  props<{ error: string }>()
);

// Add new cv
export const addCv = createAction(
  '[Cvs/Page] Add Cv',
  props<{ cv: CvDto }>()
);

export const addCvSuccess = createAction(
  '[Cvs/API] Add Cv Success'
);

export const addCvFailure = createAction(
  '[Cvs/API] Add Cv Failure',
  props<{ error: string }>()
);

// Update cv
export const updateCv = createAction(
  '[Cvs/Page] Update Cv',
  props<{ id: number; cv: CvDto }>()
);

export const updateCvSuccess = createAction(
  '[Cvs/API] Update Cv Success'
);

export const updateCvFailure = createAction(
  '[Cvs/API] Update Cv Failure',
  props<{ error: string }>()
);

// Delete cv
export const deleteCv = createAction(
  '[Cvs/Page] Delete Cv',
  props<{ id: number }>()
);

export const deleteCvSuccess = createAction(
  '[Cvs/API] Delete Cv Success'
);

export const deleteCvFailure = createAction(
  '[Cvs/API] Delete Cv Failure',
  props<{ error: string }>()
);

export const clearSelectedCv = createAction(
  '[Cvs/Page] Clear selectedCv'
)
