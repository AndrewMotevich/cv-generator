import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map } from 'rxjs';
import { CoreFacade } from '../../../ngrx/core/core.facade';
import { CvsFacade } from '../../../ngrx/cvs/cvs.facade';
import { EmployeesFacade } from '../../../ngrx/employees/employees.facade';
import {
  CVS_VALIDATE_WARNING,
  EMPLOYEE_VALIDATE_WARNING,
} from '../../../shared/constants/toasts-messages.consts';
import { ToastMessageService } from '../../../shared/services/toast-messages.service';
import { BREADCRUMB_EMPLOYEE_EDIT_FACTORY } from '../../constants/breadcrumbs.consts';
import { CvDto } from '../../models/cvs.model';
import { CV_TO_PDF } from '../../../shared/constants/routing-paths.consts';

@UntilDestroy()
@Component({
  selector: 'cv-gen-edit-employee.page',
  templateUrl: './edit-employee.page.component.html',
  styleUrls: ['./edit-employee.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditEmployeePageComponent implements OnInit {
  public loaded$ = this.employeesFacade.loaded$;

  public activeTab = 0;

  public cvaEmployeeInfoForm = new FormControl(null);
  public cvaCvForm = new FormControl(null);

  public employeeId: number;

  private invalidCv: CvDto;

  constructor(
    private cvsFacade: CvsFacade,
    private messageService: ToastMessageService,
    private employeesFacade: EmployeesFacade,
    private route: ActivatedRoute,
    private coreFacade: CoreFacade,
    private router: Router
  ) {}

  public ngOnInit() {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    this.employeesFacade.getEmployeeById(this.employeeId);

    this.employeesFacade.selectedEmployee$
      .pipe(untilDestroyed(this), filter(Boolean))
      .subscribe((employee) => {
        this.coreFacade.setBreadcrumbs(
          BREADCRUMB_EMPLOYEE_EDIT_FACTORY(employee)
        );
        this.cvaEmployeeInfoForm.setValue({
          ...employee,
        });
      });

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
    if (this.isEmployeeFormInvalid()) return;
    if (this.isCvFormInvalid()) return;
    this.employeesFacade.updateEmployee(
      this.employeeId,
      this.cvaEmployeeInfoForm.getRawValue()
    );
    this.cvsFacade.updateCvs();
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

  public deleteEmployee() {
    this.employeesFacade.deleteEmployee(this.employeeId);
  }

  public isEmployeeFormInvalid() {
    if (this.cvaEmployeeInfoForm.invalid) {
      this.messageService.showWarningMessage(EMPLOYEE_VALIDATE_WARNING);
      this.cvaEmployeeInfoForm.markAllAsTouched();
      this.activeTab = 0;
      return true;
    }
    return false;
  }

  private isCvFormInvalid() {
    if (this.invalidCv) {
      this.messageService.showWarningMessage(CVS_VALIDATE_WARNING);
      this.activeTab = 1;
      this.cvaCvForm.setValue(this.invalidCv);
      this.cvaCvForm.markAllAsTouched();
      return true;
    }
    return false;
  }

  public toPDF() {
    this.updateCv();
    if (this.isCvFormInvalid()) return;
    this.router.navigate([CV_TO_PDF.fullPath]);
  }
}
