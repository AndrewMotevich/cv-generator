import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import * as AuthSelectors from './auth.selectors';
import { ICredentials } from '../../shared/interfaces/credentials.interface';

@Injectable()
export class AuthFacade {
  private readonly store = inject(Store);

  token$ = this.store.select(AuthSelectors.selectTokenState);

  logIn(credentials: ICredentials) {
    this.store.dispatch(AuthActions.logIn({credentials}));
  }

  refreshToken() {
    this.store.dispatch(AuthActions.refreshToken());
  }
}
