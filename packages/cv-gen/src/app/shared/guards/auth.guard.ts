import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanMatchFn, Router } from '@angular/router';

// make CanMatchFn
export function authGuard() {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticate()) {
    router.navigate(['auth']);
  }

  return authService.isAuthenticate();
}
