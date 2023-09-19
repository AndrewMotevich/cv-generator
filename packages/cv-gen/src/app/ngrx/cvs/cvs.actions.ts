import { createAction, props } from '@ngrx/store';
import { CvDto } from '../../employees/models/cvs.model';
import { Update } from '@ngrx/entity';

//Get Cvs
export const getCvs = createAction('[Cvs/Component] Get Cvs');

export const loadCvsSuccess = createAction(
  '[Cvs/API] Load Cvs Success',
  props<{ cvs: CvDto[] }>()
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

export const setSelectedCvById = createAction(
  '[Cvs/Page] Set selected Cv by id',
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
export const addCvs = createAction('[Cvs/Page] Add Cvs to back');

export const addCvInStore = createAction(
  '[Cvs/Page] Add cv in Store',
  props<{ cv: CvDto }>()
);

export const addCvsSuccess = createAction('[Cvs/API] Add Cvs to back Success');

export const addCvsFailure = createAction(
  '[Cvs/API] Add Cvs to back Failure',
  props<{ error: string }>()
);

// Update cv
export const updateCvs = createAction('[Cvs/Page] Update Cvs at backend');

export const addEmployeeIdToNewCvs = createAction(
  '[Cvs/Page] Update employeeId for new cvs in store',
  props<{ employeeId: number }>()
);

export const updateCvInStore = createAction(
  '[Cvs/Page] Update in Store Cv',
  props<{ update: Update<CvDto> }>()
);

export const updateCvsSuccess = createAction(
  '[Cvs/API] Update Cv at backend Success'
);

export const updateCvsFailure = createAction(
  '[Cvs/API] Update Cvs at backend Failure',
  props<{ error: string }>()
);

// Delete cv
export const deleteCv = createAction(
  '[Cvs/Page] Delete Cv',
  props<{ id: number }>()
);

export const deleteCvInStore = createAction(
  '[Cvs/Page] Delete Cv in Store',
  props<{ id: number }>()
);

export const deleteCvSuccess = createAction('[Cvs/API] Delete Cv Success');

export const deleteCvFailure = createAction(
  '[Cvs/API] Delete Cv Failure',
  props<{ error: string }>()
);

export const clearSelectedCv = createAction('[Cvs/Page] Clear selected cv')
