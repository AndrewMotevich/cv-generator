import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as CvsActions from './cvs.actions';
import * as CvsSelectors from './cvs.selectors';

@Injectable()
export class CvsFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(CvsSelectors.selectCvsLoaded));

  cvsList$ = this.store.pipe(
    select(CvsSelectors.selectAllCvs)
  );

  selectedCvs$ = this.store.pipe(select(CvsSelectors.selectEntity));

  loadCvs() {
    this.store.dispatch(CvsActions.getCvs());
  }
}
