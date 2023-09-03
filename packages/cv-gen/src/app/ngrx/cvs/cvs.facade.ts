import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as CvsActions from './cvs.actions';
import * as CvsSelectors from './cvs.selectors';
import { CvDto } from '../../employees/models/cvs.model';
import { CvApiService } from '../../shared/services/cv-api.service';
import { map } from 'rxjs';

@Injectable()
export class CvsFacade {
  private readonly store = inject(Store);

  public loaded$ = this.store.pipe(select(CvsSelectors.selectCvsLoaded));

  public cvsList$ = this.store.pipe(select(CvsSelectors.selectAllCvs));

  public selectedCvs$ = this.store.pipe(select(CvsSelectors.selectSelectedCv));

  constructor(private cvApiService: CvApiService) {}

  public loadCvs() {
    this.store.dispatch(CvsActions.getCvs());
  }

  public addCv(cv: CvDto) {
    this.store.dispatch(CvsActions.addCv({ cv }));
  }

  public loadCvById(id: number) {
    this.store.dispatch(CvsActions.getCvById({ id }));
  }

  public getCvById(id: number) {
    return this.cvsList$.pipe(
      map((cvs) => cvs.find((cv) => cv.id === id)),
      map((cv) => this.cvApiService.transformICvToCvDto(cv))
    );
  }

  public updateCv(id: number, cv: CvDto) {
    this.store.dispatch(CvsActions.updateCv({ id, cv }));
  }

  public deleteCv(id: number) {
    this.store.dispatch(CvsActions.deleteCv({ id }));
  }
}
