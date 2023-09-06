import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { SharedApiService } from '../../shared/services/shared-api.service';
import * as SharedActions from './shared.actions';
import { ToastMessageService } from '../../shared/services/toast-messages.service';

@Injectable()
export class SharedEffects {
  constructor(
    private sharedService: SharedApiService,
    private errorsService: ToastMessageService
  ) {}

  private actions$ = inject(Actions);

  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SharedActions.getAllShared),
      switchMap(() =>
        this.sharedService.getAllSharedCollections().pipe(
          map((shared) =>
            SharedActions.loadAllSharedSuccess({ sharedCollections: shared })
          ),
          catchError((error) => {
            this.errorsService.showErrorMessage(error.message);
            return of(SharedActions.loadAllSharedFailure({ error }));
          })
        )
      )
    )
  );
}
