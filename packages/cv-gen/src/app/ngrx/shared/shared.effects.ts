import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { SharedApiService } from '../../shared/services/shared-api.service';
import * as SharedActions from './shared.actions';

@Injectable()
export class SharedEffects {
  constructor(private sharedService: SharedApiService) {}

  private actions$ = inject(Actions);

  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SharedActions.getAllShared),
      switchMap(() => this.sharedService.getAllSharedCollections()),
      map((shared) =>
        SharedActions.loadAllSharedSuccess({ sharedCollections: shared })
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(SharedActions.loadAllSharedFailure({ error }));
      })
    )
  );
}
