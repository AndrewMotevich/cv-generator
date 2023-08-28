import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, mergeMap } from 'rxjs';
import { API_PATH } from '../../../environments/environment.development';
import { AuthFacade } from '../../ngrx/auth/auth.facade';
import { AuthApiService } from '../services/auth-api.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authFacade: AuthFacade,
    private authApi: AuthApiService
  ) {}

  intercept(
    httpRequest: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      httpRequest.url.includes(`${API_PATH}/projects`) ||
      httpRequest.url.includes(`${API_PATH}/employees`)
    ) {
      return this.authFacade.token$.pipe(
        mergeMap((tokenData) => {
          const milliseconds = tokenData.expires * 1000;

          if (milliseconds < Date.now()) {
            return this.authApi.refresh().pipe(
              mergeMap((newTokenData) => {
                const newToken = `Bearer ${newTokenData.accessToken}`;
                // this.authFacade.refreshToken(newTokenData);
                return next.handle(
                  httpRequest.clone({
                    headers: httpRequest.headers.set('Authorization', newToken),
                  })
                );
              })
            );
          } else {
            const token = `Bearer ${tokenData.accessToken}`;
            return next.handle(
              httpRequest.clone({
                headers: httpRequest.headers.set('Authorization', token),
              })
            );
          }
        })
      );
    }

    return next.handle(httpRequest);
  }
}
