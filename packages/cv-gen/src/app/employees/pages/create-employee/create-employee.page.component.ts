import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs';
import { CoreFacade } from '../../../ngrx/core/core.facade';
import { CvsFacade } from '../../../ngrx/cvs/cvs.facade';
import { EmployeesFacade } from '../../../ngrx/employees/employees.facade';
import {
  CVS_VALIDATE_WARNING,
  EMPLOYEE_VALIDATE_WARNING,
} from '../../../shared/constants/toasts-messages.consts';
import { ToastMessageService } from '../../../shared/services/toast-messages.service';
import { BREADCRUMB_EMPLOYEE_CREATE } from '../../constants/breadcrumbs.consts';
import { EMPTY_EMPLOYEE } from '../../constants/empty-employee.const';
import { CvDto } from '../../models/cvs.model';

@UntilDestroy()
@Component({
  selector: 'cv-gen-create-employee.page',
  templateUrl: './create-employee.page.component.html',
  styleUrls: ['./create-employee.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEmployeePageComponent implements OnInit {
  public activeTab = 0;

  public cvaEmployeeInfoForm = new FormControl(null);
  public cvaCvForm = new FormControl(null);

  private invalidCv: CvDto;

  constructor(
    private coreFacade: CoreFacade,
    private employeesFacade: EmployeesFacade,
    private cvsFacade: CvsFacade,
    private messageService: ToastMessageService
  ) {}

  ngOnInit(): void {
    this.coreFacade.setBreadcrumbs(BREADCRUMB_EMPLOYEE_CREATE);
    this.employeesFacade.setSelectedEmployee(EMPTY_EMPLOYEE);
    this.cvsFacade.employeesCvs$
      .pipe(
        untilDestroyed(this),
        map((cvs) => cvs.filter((cv) => cv.isInvalid))
      )
      .subscribe((res) => {
        this.invalidCv = res[0];
      });
  }

  public saveEmployeeWithCvs() {
    this.updateCv();
    if (this.cvaEmployeeInfoForm.invalid) {
      this.messageService.showWarningMessage(EMPLOYEE_VALIDATE_WARNING);
      this.cvaEmployeeInfoForm.markAllAsTouched();
      this.activeTab = 0;
      return;
    }
    if (this.invalidCv) {
      this.messageService.showWarningMessage(CVS_VALIDATE_WARNING);
      this.activeTab = 1;
      this.cvaCvForm.setValue(this.invalidCv);
      this.cvaCvForm.markAllAsTouched();
      return;
    }
    this.employeesFacade.addEmployee(this.cvaEmployeeInfoForm.getRawValue());
    this.cvsFacade.addCvs();
  }

  public updateCv() {
    if (this.cvaCvForm.value) {
      this.cvsFacade.updateCvInStore(this.cvaCvForm.value.id, {
        ...this.cvaCvForm.value,
        isInvalid: this.cvaCvForm.invalid,
      });
    }
  }
}
