import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH } from 'packages/cv-gen/src/environments/environment.development';
import { map } from 'rxjs';
import { parseJwt } from '../../shared/utils/parse-jwt.util';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  constructor(private http: HttpClient) {}

  public logIn(email: string, password: string) {
    return this.http
      .post<{ access_token: string }>(`${API_PATH}/auth/login`, {
        email,
        password,
      })
      .pipe(
        map((res) => {
          const exp = parseJwt(res.access_token).exp;
          return { access_token: res.access_token, exp: exp };
        })
      );
    // TODO: handle errors
  }

  public refresh() {
    return this.http
      .get<{ access_token: string }>(`${API_PATH}/auth/refresh`)
      .pipe(
        map((res) => {
          const exp = parseJwt(res.access_token).exp;
          return { access_token: res.access_token, exp: exp };
        })
      );
    // TODO: handle errors
  }
}
