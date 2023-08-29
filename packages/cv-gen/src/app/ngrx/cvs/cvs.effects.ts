import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CvApiService } from '../../shared/services/cv-api.service';
import * as CvsActions from './cvs.actions';

@Injectable()
export class CvsEffects {
  constructor(private cvsService: CvApiService) {}

  private actions$ = inject(Actions);

  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CvsActions.getCvs),
      switchMap(() => this.cvsService.getCvs()),
      map((cvs) => CvsActions.loadCvsSuccess({ cvs })),
      catchError((error) => {
        console.error('Error', error);
        return of(CvsActions.loadCvsFailure({ error }));
      })
    )
  );
}
