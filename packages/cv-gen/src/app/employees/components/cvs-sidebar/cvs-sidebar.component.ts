import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CvsFacade } from '../../../ngrx/cvs/cvs.facade';
import { EmployeesFacade } from '../../../ngrx/employees/employees.facade';
import { ICvName } from '../../../shared/interfaces/cv-name.interface';
import { EMPTY_CV } from '../../constants/empty-cv.const';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'cv-gen-cvs-sidebar',
  templateUrl: './cvs-sidebar.component.html',
  styleUrls: ['./cvs-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvsSidebarComponent implements OnInit {
  public cvsNames: ICvName[];

  public cvId: number;

  constructor(
    private cvsFacade: CvsFacade,
    private employeeFacade: EmployeesFacade,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    this.cvsFacade.loadCvs();
    this.cvsFacade.cvsNames$.pipe(untilDestroyed(this)).subscribe((cvs) => {
      this.cvsNames = cvs;
      this.cdr.markForCheck();
    });
  }

  public addNewCv() {
    const id = Date.now();
    this.employeeFacade.selectedEmployee$
      .pipe(untilDestroyed(this))
      .subscribe((employee) => {
        this.cvsFacade.addCvInStore({
          ...EMPTY_CV,
          ...employee,
          id,
          employeeId: employee.id,
        });
      });
    this.cvsFacade.setSelectedCv(id);
  }

  public selectCv(cv: ICvName) {
    this.cvsFacade.setSelectedCv(cv.id);
    this.cvId = cv.id;
  }

  public deleteCv(event: Event, cv: ICvName) {
    event.stopPropagation();
    if (!cv.isNew) {
      this.cvsFacade.deleteCv(cv.id);
    }
    this.cvsNames = this.cvsNames.filter((elem) => elem.id !== cv.id);
  }
}
