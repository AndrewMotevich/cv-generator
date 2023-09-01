import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EmployeesFacade } from '../../../ngrx/employees/employees.facade';

@Component({
  selector: 'cv-gen-create-employee.page',
  templateUrl: './create-employee.page.component.html',
  styleUrls: ['./create-employee.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEmployeePageComponent {
  public cvaEmployeeInfoForm = new FormControl(null);

  public cvaCvForm = new FormControl(null);

  constructor(private employeesFacade: EmployeesFacade) {}

  public submitEmployeeForm() {
    if (this.cvaEmployeeInfoForm.invalid) {
      this.cvaEmployeeInfoForm.markAsTouched();
      return;
    }
    this.employeesFacade.addEmployee(this.cvaEmployeeInfoForm.getRawValue());
  }

  public clearEmployeeForm() {
    this.cvaEmployeeInfoForm.setValue({
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      specialization: '',
    });
    this.cvaEmployeeInfoForm.updateValueAndValidity()
  }
}
