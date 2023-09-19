import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, mergeMap, take } from 'rxjs';
import { AuthFacade } from '../../ngrx/auth/auth.facade';
import { AuthApiService } from '../services/auth-api.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(
    private authFacade: AuthFacade,
    private authApi: AuthApiService
  ) {}

  intercept(
    httpRequest: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      httpRequest.url.includes('i18n') ||
      httpRequest.url.includes('login') ||
      httpRequest.url.includes('refresh')
    ) {
      return next.handle(httpRequest);
    }
    return this.authFacade.token$.pipe(
      filter(Boolean),
      take(1),
      mergeMap((tokenData) => {
        if (tokenData.expires < Date.now()) {
          return this.authApi.refresh().pipe(
            mergeMap((newTokenData) => {
              this.authFacade.refreshToken(newTokenData);
              return this.handle(next, httpRequest, newTokenData.accessToken);
            })
          );
        } else {
          return this.handle(next, httpRequest, tokenData.accessToken);
        }
      })
    );
  }

  private handle(
    next: HttpHandler,
    httpRequest: HttpRequest<unknown>,
    accessToken: string
  ) {
    const token = `Bearer ${accessToken}`;
    return next.handle(
      httpRequest.clone({
        headers: httpRequest.headers.set('Authorization', token),
      })
    );
  }
}
