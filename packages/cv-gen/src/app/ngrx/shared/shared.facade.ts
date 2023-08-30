import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as SharedActions from './shared.actions';
import * as SharedSelectors from './shared.selectors';

@Injectable()
export class SharedFacade {
  private readonly store = inject(Store);

  public allSharedState$ = this.store.select(
    SharedSelectors.selectAllSharedState
  );

  public departments$ = this.store.select(SharedSelectors.selectDepartments);
  public specializations$ = this.store.select(
    SharedSelectors.selectSpecializations
  );
  public skills$ = this.store.select(SharedSelectors.selectSkills);
  public teamRoles$ = this.store.select(SharedSelectors.selectTeamRoles);
  public responsibilities$ = this.store.select(
    SharedSelectors.selectResponsibilities
  );
  public languages$ = this.store.select(SharedSelectors.selectLanguages);

  public getAllShared() {
    this.store.dispatch(SharedActions.getAllShared());
  }
}
