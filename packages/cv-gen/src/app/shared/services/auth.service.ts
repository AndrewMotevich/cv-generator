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

  public setIsLogin(rememberMe = false): BehaviorSubject<boolean> {
    if (rememberMe) localStorage.setItem('rememberMe', 'true');
    else localStorage.setItem('rememberMe', 'false');
    return this.isLogin;
  }

  public logOut() {
    this.isLogin.next(false);
    this.router.navigate([AUTH.path]);
  }
}
