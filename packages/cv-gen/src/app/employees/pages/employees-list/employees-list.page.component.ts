import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IEmployee } from '../../models/employee.model';
import { employeesMock } from '../../../ngrx/employees/mock/employees.mock';
import { IColumns } from '../../../shared/interfaces/shared.interfeces';
import { Router } from '@angular/router';

@Component({
  selector: 'cv-gen-employees-list.page',
  templateUrl: './employees-list.page.component.html',
  styleUrls: ['./employees-list.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesListPageComponent {
  data: IEmployee[] = employeesMock;

  cols: IColumns[] = [
    { field: 'firstName', header: 'First name' },
    { field: 'lastName', header: 'Last name' },
    { field: 'email', header: 'Email' },
    { field: 'department', header: 'Department' },
    { field: 'specialization', header: 'Specialization' },
  ];

  constructor(private router: Router) {}

  log(data: unknown) {
    this.router.navigate(['employees', 'create']);
    console.log(data);
  }
}
