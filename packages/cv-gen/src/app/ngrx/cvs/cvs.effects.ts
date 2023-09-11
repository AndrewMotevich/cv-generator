import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { CvApiService } from '../../shared/services/cv-api.service';
import * as CvsActions from './cvs.actions';
import { CvsFacade } from './cvs.facade';
import { ToastMessageService } from '../../shared/services/toast-messages.service';
import { TranslateService } from '@ngx-translate/core';
import {
  VALUES_LOADED_FAILURE,
  VALUE_ADDED_FAILURE,
  VALUE_DELETED_FAILURE,
  VALUE_LOADED_FAILURE,
  VALUE_UPDATED_FAILURE,
} from '../../shared/constants/toasts-messages.consts';

@Injectable()
export class CvsEffects {
  constructor(
    private cvsService: CvApiService,
    private cvsFacade: CvsFacade,
    private errorsService: ToastMessageService,
    private translateService: TranslateService
  ) {}
  private translationCVS = this.translateService.instant('HEADER.CVS');
  private translationCV = this.translateService.instant('HEADER.CV');
  private actions$ = inject(Actions);

  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CvsActions.getCvs),
      switchMap(() =>
        this.cvsService.getCvs().pipe(
          map((cvs) => CvsActions.loadCvsSuccess({ cvs })),
          catchError((error) => {
            this.errorsService.showErrorMessage(
              VALUES_LOADED_FAILURE,
              this.translationCVS
            );
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
            this.errorsService.showErrorMessage(
              VALUE_LOADED_FAILURE,
              this.translationCV
            );
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
            this.errorsService.showErrorMessage(
              VALUE_ADDED_FAILURE,
              this.translationCV
            );
            return of(CvsActions.addCvsFailure({ error }));
          })
        )
      )
    )
  );

  putMany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CvsActions.updateCvs),
      switchMap(() => this.cvsFacade.employeeOldCvs$),
      switchMap((cvs) =>
        this.cvsService.updateCvs(cvs).pipe(
          map(() => CvsActions.updateCvsSuccess()),
          tap(() => {
            this.cvsFacade.loadCvs();
          }),
          catchError((error) => {
            this.errorsService.showErrorMessage(
              VALUE_UPDATED_FAILURE,
              this.translationCV
            );
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
            this.errorsService.showErrorMessage(
              VALUE_DELETED_FAILURE,
              this.translationCV
            );
            return of(CvsActions.deleteCvFailure({ error }));
          })
        )
      )
    )
  );
}
