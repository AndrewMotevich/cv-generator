import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { map } from 'rxjs';
import { CvDto } from '../../employees/models/cvs.model';
import * as CvsActions from './cvs.actions';
import * as CvsSelectors from './cvs.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable()
export class CvsFacade {
  private readonly store = inject(Store);

  public loaded$ = this.store.pipe(select(CvsSelectors.selectCvsLoaded));

  public cvsList$ = this.store.pipe(select(CvsSelectors.selectAllCvs));

  public cvsNames$ = this.store.pipe(
    select(CvsSelectors.selectEmployeesCvs),
    map((cvs) =>
      cvs.map((cv) => ({
        cvName: cv.cvName,
        id: cv.id,
        isNew: cv.isNew,
      }))
    )
  );

  public selectedEmployeesCvs$ = this.store.pipe(
    select(CvsSelectors.selectEmployeesCvs)
  );

  public selectedCvs$ = this.store.pipe(select(CvsSelectors.selectSelectedCv));

  public loadCvs() {
    this.store.dispatch(CvsActions.getCvs());
  }

  public addCv(cv: CvDto) {
    this.store.dispatch(CvsActions.addCv({ cv }));
  }

  public loadCvById(id: number) {
    this.store.dispatch(CvsActions.getCvById({ id }));
  }

  public addCvInStore(cv: CvDto) {
    this.store.dispatch(CvsActions.addCvInStore({ cv }));
  }

  public setSelectedCv(id: number) {
    if (!id) {
      this.store.dispatch(CvsActions.loadCvByIdSuccess({ cv: null }));
      return;
    }
    this.cvsList$
      .pipe(
        untilDestroyed(this),
        map((cvs) => cvs.find((cv) => cv.id === id))
      )
      .subscribe((cv) => {
        this.store.dispatch(CvsActions.loadCvByIdSuccess({ cv }));
      });
  }

  public updateCv(id: number, cv: CvDto) {
    this.store.dispatch(CvsActions.updateCv({ id, cv }));
  }

  public deleteCv(id: number) {
    this.store.dispatch(CvsActions.deleteCv({ id }));
  }

  public deleteCvInStore(id: number) {
    this.store.dispatch(CvsActions.deleteCvInStore({ id }));
  }
}
