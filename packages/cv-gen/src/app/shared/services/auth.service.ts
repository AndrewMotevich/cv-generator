import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AUTH } from '../constants/routing-paths.consts';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLogin = new BehaviorSubject(false);

  constructor(private router: Router) {}

  public isAuthenticate(): boolean {
    return this.isLogin.getValue();
  }

  public setIsLogin(): BehaviorSubject<boolean> {
    return this.isLogin;
  }

  public logOut() {
    this.isLogin.next(false);
    this.router.navigate([AUTH.path]);
  }
}
