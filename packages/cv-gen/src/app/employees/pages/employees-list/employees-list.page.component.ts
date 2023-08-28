import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IEmployee } from '../../models/employee.model';
import { employeesMock } from '../../../ngrx/employees/mock/employees.mock';
import { IColumns } from '../../../shared/interfaces/shared.interfeces';
import { Router } from '@angular/router';
import { EDIT_EMPLOYEES, EMPLOYEES } from '../../../shared/constants/routing-paths.consts';
import { EmployeesColumns } from '../../constants/employees-columns.const';
import { EmployeesApiService } from '../../../shared/services/employees-api.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'cv-gen-employees-list.page',
  templateUrl: './employees-list.page.component.html',
  styleUrls: ['./employees-list.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesListPageComponent {
  public data: IEmployee[] = employeesMock;
  public cols: IColumns[] = EmployeesColumns

  public readonly addEmployeePath = EMPLOYEES.fullPath + EMPLOYEES.fullPath

  constructor(private router: Router, private employeesApiService: EmployeesApiService) {
    this.employeesApiService.getEmployees().pipe(untilDestroyed(this)).subscribe(res => console.log(res))
  }

  public navigateToEdit(data: unknown) {
    this.router.navigate([EMPLOYEES.path, EDIT_EMPLOYEES.path, (data as {id: number}).id]);
  }
}
