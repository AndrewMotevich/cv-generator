import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, take, tap } from 'rxjs';
import {
  CV,
  CVS,
  VALUES_LOADED_FAILURE,
  VALUE_ADDED_FAILURE,
  VALUE_DELETED_FAILURE,
  VALUE_LOADED_FAILURE,
  VALUE_UPDATED_FAILURE,
} from '../../shared/constants/toasts-messages.consts';
import { CvApiService } from '../../shared/services/cv-api.service';
import { ToastMessageService } from '../../shared/services/toast-messages.service';
import * as CvsActions from './cvs.actions';
import { CvsFacade } from './cvs.facade';

@Injectable()
export class CvsEffects {
  constructor(
    private cvsService: CvApiService,
    private cvsFacade: CvsFacade,
    private errorsService: ToastMessageService
  ) {}
  private actions$ = inject(Actions);

  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CvsActions.getCvs),
      switchMap(() =>
        this.cvsService.getCvs().pipe(
          map((cvs) => CvsActions.loadCvsSuccess({ cvs })),
          catchError((error) => {
            this.errorsService.showErrorMessage(VALUES_LOADED_FAILURE, CVS);
            return of(CvsActions.loadCvsFailure({ error }));
          })
        )
      )
    )
  );

  getById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CvsActions.getCvById),
      switchMap((action) =>
        this.cvsService.getCvById(action.id).pipe(
          map((cv) => CvsActions.loadCvByIdSuccess({ cv })),
          catchError((error) => {
            this.errorsService.showErrorMessage(VALUE_LOADED_FAILURE, CV);
            return of(CvsActions.loadCvsFailure({ error }));
          })
        )
      )
    )
  );

  postMany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CvsActions.addCvs),
      switchMap(() => this.cvsFacade.employeeNewCvs$),
      switchMap((cvs) =>
        this.cvsService.addCvs(cvs).pipe(
          map(() => CvsActions.addCvsSuccess()),
          tap(() => {
            this.cvsFacade.loadCvs();
          }),
          catchError((error) => {
            this.errorsService.showErrorMessage(VALUE_ADDED_FAILURE, CV);
            return of(CvsActions.addCvsFailure({ error }));
          })
        )
      )
    )
  );

  putMany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CvsActions.updateCvs),
      switchMap(() => this.cvsFacade.employeeOldCvs$.pipe(take(1))),
      switchMap((cvs) =>
        this.cvsService.updateCvs(cvs).pipe(
          map(() => CvsActions.updateCvsSuccess()),
          tap(() => {
            this.cvsFacade.loadCvs();
          }),
          catchError((error) => {
            this.errorsService.showErrorMessage(VALUE_UPDATED_FAILURE, CV);
            return of(CvsActions.updateCvsFailure({ error }));
          })
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CvsActions.deleteCv),
      switchMap((action) =>
        this.cvsService.deleteCv(action.id).pipe(
          map(() => CvsActions.deleteCvSuccess()),
          catchError((error) => {
            this.errorsService.showErrorMessage(VALUE_DELETED_FAILURE, CV);
            return of(CvsActions.deleteCvFailure({ error }));
          })
        )
      )
    )
  );
}
