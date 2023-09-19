import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { AUTH, EMPLOYEES } from '../../shared/constants/routing-paths.consts';
import { AuthApiService } from '../../shared/services/auth-api.service';
import { ToastMessageService } from '../../shared/services/toast-messages.service';
import { CoreFacade } from '../core/core.facade';
import * as AuthActions from './auth.actions';
import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_FAILURE,
  AUTH_REFRESH_FAILURE_INFO,
} from '../../shared/constants/toasts-messages.consts';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authApiService: AuthApiService,
    private coreFacade: CoreFacade,
    private router: Router,
    private errorsService: ToastMessageService
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
            this.errorsService.showErrorMessage(AUTH_LOGIN_FAILURE);
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
            // this.router.navigate([EMPLOYEES.path]);
          }),
          catchError((error) => {
            this.errorsService.showInfoMessage(AUTH_REFRESH_FAILURE_INFO);
            return of(AuthActions.AuthFailure({ error }));
          })
        )
      )
    )
  );

  public logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logOut),
      switchMap(() =>
        this.authApiService.logOut().pipe(
          map(() => {
            this.router.navigate([AUTH.path]);
            return AuthActions.logOutSuccess();
          }),
          catchError((error) => {
            this.errorsService.showErrorMessage(AUTH_LOGOUT_FAILURE);
            return of(AuthActions.AuthFailure({ error }));
          })
        )
      )
    )
  );
}
