import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map } from 'rxjs';
import { CoreFacade } from '../../../ngrx/core/core.facade';
import { CvsFacade } from '../../../ngrx/cvs/cvs.facade';
import { EmployeesFacade } from '../../../ngrx/employees/employees.facade';
import {
  EDIT_EMPLOYEES,
  EMPLOYEES,
} from '../../../shared/constants/routing-paths.consts';
import { ToastMessageService } from '../../../shared/services/toast-messages.service';
import { BREADCRUMB_EMPLOYEE_EDIT } from '../../constants/breadcrumbs.consts';
import { CvDto } from '../../models/cvs.model';

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

  private readonly employeeEditPath = EDIT_EMPLOYEES.fullPath;
  private readonly employeesPath = EMPLOYEES.fullPath;

  public employeeId: number;

  private invalidCv: CvDto;

  constructor(
    private cvsFacade: CvsFacade,
    private messageService: ToastMessageService,
    private employeesFacade: EmployeesFacade,
    private route: ActivatedRoute,
    private coreFacade: CoreFacade
  ) {}

  public ngOnInit() {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    this.employeesFacade.getEmployeeById(this.employeeId);

    this.employeesFacade.selectedEmployee$
      .pipe(untilDestroyed(this), filter(Boolean))
      .subscribe((employee) => {
        this.coreFacade.setBreadcrumbs(BREADCRUMB_EMPLOYEE_EDIT(employee));
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
    if (this.cvaEmployeeInfoForm.invalid) {
      this.messageService.showWarningMessage(
        'You should write all Employee data'
      );
      this.cvaEmployeeInfoForm.markAllAsTouched();
      this.activeTab = 0;
      return;
    }
    if (this.invalidCv) {
      this.messageService.showWarningMessage('You should enter all Cv data');
      this.activeTab = 1;
      this.cvaCvForm.setValue(this.invalidCv);
      this.cvaCvForm.markAllAsTouched();
      return;
    }
    this.messageService.showSuccessMessage(
      'Hooray!!! You successfully save Employee and cvs'
    );
    this.employeesFacade.updateEmployee(
      this.employeeId,
      this.cvaEmployeeInfoForm.getRawValue()
    );
    this.cvsFacade.addCvs();
    this.cvsFacade.updateCvs();
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
}
