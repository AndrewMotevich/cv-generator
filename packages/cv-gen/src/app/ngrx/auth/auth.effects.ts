import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { AuthApiService } from '../../auth/services/auth-api.service';
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
        const { email, password } = caughtAction.credentials;
        return this.authApiService
          .logIn(email, password)
          .pipe(map((res) => AuthActions.logInSuccess({ credentials: res })));
      })
      //TODO: add error handler
    )
  );

  public refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      mergeMap(() =>
        this.authApiService
          .refresh()
          .pipe(map((res) => AuthActions.logInSuccess({ credentials: res })))
      )
      //TODO: add error handler
    )
  );
}
