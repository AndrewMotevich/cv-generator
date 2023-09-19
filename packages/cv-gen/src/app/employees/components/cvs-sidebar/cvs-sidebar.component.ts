import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CvsFacade } from '../../../ngrx/cvs/cvs.facade';
import { EmployeesFacade } from '../../../ngrx/employees/employees.facade';
import { ICvName } from '../../../shared/interfaces/cv-name.interface';
import { EMPTY_CV } from '../../constants/empty-cv.const';
import { filter } from 'rxjs';
import { EmployeeDto } from '../../models/employee.model';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'cv-gen-cvs-sidebar',
  templateUrl: './cvs-sidebar.component.html',
  styleUrls: ['./cvs-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvsSidebarComponent implements OnInit {
  @Input() public cvForm: FormControl;
  public cvsNames: ICvName[];

  public cvId: number;
  public employeeData: EmployeeDto;

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
    this.employeeFacade.selectedEmployee$
      .pipe(untilDestroyed(this), filter(Boolean))
      .subscribe((employee) => {
        this.employeeData = employee;
      });
  }

  public addNewCv() {
    this.cvForm.markAsUntouched();
    const id = Date.now();

    this.cvsFacade.addCvInStore({
      ...EMPTY_CV,
      ...this.employeeData,
      id,
      employeeId: this.employeeData.id,
    });

    this.selectCv(id);
  }

  public selectCv(id: number) {
    if (this.cvForm.value) {
      this.cvsFacade.updateCvInStore(this.cvForm.value.id, {
        ...this.cvForm.value,
        isInvalid: this.cvForm.invalid,
      });
    }
    this.cvsFacade.setSelectedCv(id);
    this.cvId = id;
  }

  public deleteCv(event: Event, cv: ICvName) {
    event.stopPropagation();
    if (!cv.isNew) {
      this.cvsFacade.deleteCv(cv.id);
    }
    this.cvsNames = this.cvsNames.filter((elem) => elem.id !== cv.id);
    this.cvsFacade.deleteCvInStore(cv.id);
    this.cvsFacade.setSelectedCv(0);
  }
}
