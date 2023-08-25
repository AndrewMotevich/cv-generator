import { Injectable } from "@angular/core";

@Injectable({providedIn: "root"})
export class AuthService {
  private isLogin = true

  public isAuthenticate(){
    return this.isLogin
  }
}
