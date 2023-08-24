import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import * as AuthSelectors from './auth.selectors';

@Injectable()
export class AuthFacade {
  private readonly store = inject(Store);

  token$ = this.store.select(AuthSelectors.selectTokenState);

  logIn(email: string, password: string) {
    this.store.dispatch(AuthActions.logIn({credentials: {email, password}}));
  }
}
