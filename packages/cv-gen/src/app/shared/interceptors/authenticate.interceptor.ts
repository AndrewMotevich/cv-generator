import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { API_PATH } from '../../../environments/environment.development';
import { AuthService } from '../services/auth.service';
import { EMPLOYEES } from '../constants/routing-paths.consts';

@Injectable()
export class AuthenticateInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    httpRequest: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (httpRequest.url.includes(`${API_PATH}/auth/login`)) {
      return next.handle(httpRequest).pipe(
        tap(
          (event) => {
            if (event instanceof HttpResponse) {
              this.authService.setIsLogin().next(true);
              this.router.navigate([EMPLOYEES.path]);
            }
          },
          (err) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status == 403) alert('Forbidden Error');
            }
          }
        )
      );
    }

    return next.handle(httpRequest);
  }
}
