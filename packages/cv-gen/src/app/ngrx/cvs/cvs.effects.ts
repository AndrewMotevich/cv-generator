import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { CvApiService } from '../../shared/services/cv-api.service';
import * as CvsActions from './cvs.actions';
import { CvsFacade } from './cvs.facade';
import { ToastMessageService } from '../../shared/services/toast-messages.service';

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
            this.errorsService.showErrorMessage(error.message);
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
            this.errorsService.showErrorMessage(error.message);
            return of(CvsActions.loadCvsFailure({ error }));
          })
        )
      )
    )
  );

  post$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CvsActions.addCv),
      switchMap((action) =>
        this.cvsService.addCv(action.cv).pipe(
          map(() => CvsActions.addCvSuccess()),
          tap(() => {
            this.cvsFacade.loadCvs();
          }),
          catchError((error) => {
            this.errorsService.showErrorMessage(error.message);
            return of(CvsActions.addCvFailure({ error }));
          })
        )
      )
    )
  );

  put$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CvsActions.updateCv),
      switchMap((action) =>
        this.cvsService.updateCv(action.id, action.cv).pipe(
          map(() => CvsActions.updateCvSuccess()),
          tap(() => {
            this.cvsFacade.loadCvs();
          }),
          catchError((error) => {
            this.errorsService.showErrorMessage(error.message);
            return of(CvsActions.updateCvFailure({ error }));
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
          tap(() => {
            this.cvsFacade.loadCvs();
          }),
          catchError((error) => {
            this.errorsService.showErrorMessage(error.message);
            return of(CvsActions.deleteCvFailure({ error }));
          })
        )
      )
    )
  );
}
