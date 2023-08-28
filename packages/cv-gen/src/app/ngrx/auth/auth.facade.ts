import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import * as AuthSelectors from './auth.selectors';
import { ICredentials } from '../../shared/interfaces/credentials.interface';
import { ITokenData } from '../../shared/interfaces/token-data.interface';

@Injectable()
export class AuthFacade {
  private readonly store = inject(Store);

  public token$ = this.store.select(AuthSelectors.selectTokenState);

  public logIn(credentials: ICredentials) {
    this.store.dispatch(AuthActions.logIn({credentials}));
  }

  public refreshToken(tokenData: ITokenData) {
    this.store.dispatch(AuthActions.logInSuccess({tokenData}));
  }
}
