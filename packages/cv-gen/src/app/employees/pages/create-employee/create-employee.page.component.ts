import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EmployeesFacade } from '../../../ngrx/employees/employees.facade';

@Component({
  selector: 'cv-gen-create-employee.page',
  templateUrl: './create-employee.page.component.html',
  styleUrls: ['./create-employee.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEmployeePageComponent implements OnInit {
  public cvaEmployeeInfoForm = new FormControl(null);
  public cvaCvForm = new FormControl(null);

  constructor(private employeesFacade: EmployeesFacade) {}

  ngOnInit(): void {
    this.employeesFacade.setSelectedEmployee({
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      specialization: '',
    });
  }
}
