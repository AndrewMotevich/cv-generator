import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH } from '../../../environments/environment.development';
import { map } from 'rxjs';
import { parseJwt } from '../utils/parse-jwt.util';
import { ICredentials } from '../interfaces/credentials.interface';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  constructor(private http: HttpClient) {}

  public logIn(credentials: ICredentials) {
    return this.http
      .post<{ access_token: string }>(
        `${API_PATH}/auth/login`,
        credentials,
        { withCredentials: true }
      )
      .pipe(
        map((res) => {
          const exp = parseJwt(res.access_token).exp;
          return { accessToken: res.access_token, expires: exp * 1000};
        })
      );
  }

  public refresh() {
    return this.http
      .get<{ access_token: string }>(`${API_PATH}/auth/refresh`, {
        withCredentials: true,
      })
      .pipe(
        map((res) => {
          const exp = parseJwt(res.access_token).exp;
          return { accessToken: res.access_token, expires: exp * 1000 };
        })
      );
  }
}
