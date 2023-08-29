import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { map, take, tap } from 'rxjs';
import { CoreFacade } from '../../ngrx/core/core.facade';

export const authGuard: CanMatchFn = () => {
  const coreFacade = inject(CoreFacade);
  const router = inject(Router);

  return coreFacade.isLogin$.pipe(
    take(1),
    tap((isLogin: boolean) => {
      if (!isLogin) {
        router.navigate(['auth']);
      }
    }),
    map((token) => Boolean(token))
  );
}
