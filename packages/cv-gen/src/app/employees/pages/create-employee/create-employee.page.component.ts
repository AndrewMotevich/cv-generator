import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EmployeesFacade } from '../../../ngrx/employees/employees.facade';
import { EMPTY_EMPLOYEE } from '../../constants/empty-employee.const';
import { CvsFacade } from '../../../ngrx/cvs/cvs.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs';
import { CvDto } from '../../models/cvs.model';
import { ToastMessageService } from '../../../shared/services/toast-messages.service';

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
    private employeesFacade: EmployeesFacade,
    private cvsFacade: CvsFacade,
    private messageService: ToastMessageService
  ) {}

  ngOnInit(): void {
    this.employeesFacade.setSelectedEmployee(EMPTY_EMPLOYEE);
    this.cvsFacade.selectedEmployeesCvs$
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
      this.messageService.showWarningMessage("You should write all Employee data")
      this.cvaEmployeeInfoForm.markAllAsTouched();
      this.activeTab = 0;
      return;
    }
    if (this.invalidCv) {
      this.messageService.showWarningMessage("You should enter all Cv data")
      this.activeTab = 1;
      this.cvaCvForm.setValue(this.invalidCv);
      this.cvaCvForm.markAllAsTouched();
      return;
    }
    this.messageService.showSuccessMessage("Hooray!!! You successfully save Employee and cvs")
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
