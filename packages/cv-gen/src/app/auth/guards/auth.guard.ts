import { inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
// import { Router } from '@angular/router';

export const authGuard = () => {
  const authService = inject(AuthService);
  // const router = inject(Router);

  // if(authService.isLogin) router.navigate(['employees'])
  // else router.navigate(['auth'])
  return authService.isAuthenticate();
};
