import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthFacade } from '../../ngrx/auth/auth.facade';
import { CoreFacade } from '../../ngrx/core/core.facade';

@UntilDestroy()
@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLogin = false;

  constructor(
    private coreFacade: CoreFacade,
    private authFacade: AuthFacade
  ) {
    this.coreFacade.isLogin$.pipe(untilDestroyed(this)).subscribe((value) => {
      this.isLogin = value;
    });
  }

  public isAuthenticate() {
    return this.isLogin;
  }

  public initialRefresh() {
    this.authFacade.initialRefreshToken();
  }

  public logOut() {
    this.authFacade.logOut();
  }
}
