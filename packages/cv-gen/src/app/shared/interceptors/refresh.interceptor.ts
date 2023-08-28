import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API_PATH } from '../../../environments/environment.development';
import { AuthFacade } from '../../ngrx/auth/auth.facade';
import { ITokenData } from '../interfaces/token-data.interface';
import { parseJwt } from '../utils/parse-jwt.util';

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {
  constructor(private authFacade: AuthFacade) {}

  intercept(
    httpRequest: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (httpRequest.url.includes(`${API_PATH}/auth/refresh`)) {
      return next.handle(httpRequest).pipe(
        tap((event) => {
          console.log(event);
          if (event instanceof HttpResponse) {
            const accessToken = (event.body as { access_token: string })
              .access_token;
            const expires = parseJwt(accessToken).exp;
            const tokenData: ITokenData = { accessToken, expires };
            this.authFacade.refreshToken(tokenData);
          }
        })
      );
    }

    return next.handle(httpRequest);
  }
}
