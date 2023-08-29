import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs';
import { EMPLOYEES } from '../../shared/constants/routing-paths.consts';
import { AuthApiService } from '../../shared/services/auth-api.service';
import { CoreFacade } from '../core/core.facade';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authApiService: AuthApiService,
    private coreFacade: CoreFacade,
    private router: Router
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
          })
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
