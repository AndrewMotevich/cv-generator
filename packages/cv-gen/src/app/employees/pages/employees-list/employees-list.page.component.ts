import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IEmployee } from '../../models/employee.model';
import { employeesMock } from '../../../ngrx/employees/mock/employees.mock';
import { IColumns } from '../../../shared/interfaces/shared.interfeces';
import { Router } from '@angular/router';
import { EDIT_EMPLOYEES, EMPLOYEES } from '../../../shared/constants/routing-paths.consts';
import { EmployeesColumns } from '../../constants/employees-columns.const';

@Component({
  selector: 'cv-gen-employees-list.page',
  templateUrl: './employees-list.page.component.html',
  styleUrls: ['./employees-list.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesListPageComponent {
  data: IEmployee[] = employeesMock;

  cols: IColumns[] = EmployeesColumns

  public addEmployeePath = EMPLOYEES.fullPath + EMPLOYEES.fullPath

  constructor(private router: Router) {}

  navigateToEdit(data: unknown) {
    console.log(EMPLOYEES.path, EDIT_EMPLOYEES.path, (data as {id: number}).id)
    this.router.navigate([EMPLOYEES.path, EDIT_EMPLOYEES.path, (data as {id: number}).id]);
  }
}
