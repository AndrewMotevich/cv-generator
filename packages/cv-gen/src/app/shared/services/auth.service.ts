import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CoreFacade } from '../../ngrx/core/core.facade';
import { AUTH } from '../constants/routing-paths.consts';

@UntilDestroy()
@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLogin = false;

  constructor(private router: Router, private coreFacade: CoreFacade) {
    this.coreFacade.isLogin$.pipe(untilDestroyed(this)).subscribe((value) => {
      this.isLogin = value;
    });
  }

  public isAuthenticate() {
    return this.isLogin;
  }

  public logOut() {
    this.router.navigate([AUTH.path]);
  }
}
