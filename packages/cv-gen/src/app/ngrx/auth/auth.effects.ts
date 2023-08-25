import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { AuthApiService } from '../../shared/services/auth-api.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authApiService: AuthApiService
  ) {}

  public login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logIn),
      mergeMap((caughtAction) => {
        return this.authApiService.logIn(caughtAction.credentials).pipe(
          map((res) => AuthActions.logInSuccess({ tokenData: res }))
          //TODO: add error handler
        );
      })
    )
  );

  public refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      mergeMap(() =>
        this.authApiService.refresh().pipe(
          map((res) => AuthActions.logInSuccess({ tokenData: res }))
          //TODO: add error handler
        )
      )
    )
  );
}
