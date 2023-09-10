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

  public employeeNewCvs$ = this.store.pipe(
    select(CvsSelectors.selectNewEmployeesCvs)
  );
  public employeeOldCvs$ = this.store.pipe(
    select(CvsSelectors.selectOldEmployeesCvs)
  );

  public employeesCvs$ = this.store.pipe(
    select(CvsSelectors.selectEmployeesCvs)
  );

  public selectedCv$ = this.store.pipe(select(CvsSelectors.selectSelectedCv));

  public loadCvs() {
    this.store.dispatch(CvsActions.getCvs());
  }

  public addCvs() {
    this.store.dispatch(CvsActions.addCvs());
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

  public updateCvs() {
    this.store.dispatch(CvsActions.updateCvs());
  }

  public updateCvInStore(id: number, cv: CvDto) {
    this.store.dispatch(
      CvsActions.updateCvInStore({ update: { id, changes: cv } })
    );
  }

  public deleteCv(id: number) {
    this.store.dispatch(CvsActions.deleteCv({ id }));
  }

  public deleteCvInStore(id: number) {
    this.store.dispatch(CvsActions.deleteCvInStore({ id }));
  }
}
