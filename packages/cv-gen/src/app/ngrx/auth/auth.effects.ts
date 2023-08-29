import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { AUTH, EMPLOYEES } from '../../shared/constants/routing-paths.consts';
import { AuthApiService } from '../../shared/services/auth-api.service';
import { ErrorsApiService } from '../../shared/services/errors-api.service';
import { CoreFacade } from '../core/core.facade';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authApiService: AuthApiService,
    private coreFacade: CoreFacade,
    private router: Router,
    private errorsService: ErrorsApiService
  ) {}

  public login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logIn),
      mergeMap((caughtAction) => {
        return this.authApiService.logIn(caughtAction.credentials).pipe(
          map((res) => AuthActions.logInSuccess({ tokenData: res })),
          tap(() => {
            this.coreFacade.setIsLogin(true);
            this.router.navigate([EMPLOYEES.path]);
          }),
          catchError((error) => {
            if (error.status === 403)
              this.errorsService.showErrorMessage('Forbidden');
            return of(AuthActions.AuthFailure({ error }));
          })
        );
      })
    )
  );

  public refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      mergeMap(() =>
        this.authApiService.refresh().pipe(
          map((res) => AuthActions.logInSuccess({ tokenData: res })),
          tap(() => {
            this.coreFacade.setIsLogin(true);
            this.router.navigate([EMPLOYEES.path]);
          }),
          catchError((error) => {
            return of(AuthActions.AuthFailure({ error }));
          })
        )
      )
    )
  );

  public logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logOut),
      switchMap(() => this.authApiService.logOut()),
      map(() => {
        this.router.navigate([AUTH.path]);
        return AuthActions.logOutSuccess();
      }),
      catchError((error) => {
        if (error.status === 403)
          this.errorsService.showErrorMessage('Forbidden');
        return of(AuthActions.AuthFailure({ error }));
      })
    )
  );
}
