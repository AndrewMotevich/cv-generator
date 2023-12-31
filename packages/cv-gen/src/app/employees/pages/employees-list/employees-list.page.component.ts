import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { CoreFacade } from '../../../ngrx/core/core.facade';
import { EmployeesFacade } from '../../../ngrx/employees/employees.facade';
import {
  CREATE_EMPLOYEES,
  EDIT_EMPLOYEES,
  EMPLOYEES,
} from '../../../shared/constants/routing-paths.consts';
import { IColumns } from '../../../shared/interfaces/columns.interfeces';
import { BREADCRUMB_EMPLOYEE_LIST } from '../../constants/breadcrumbs.consts';
import { EmployeesColumns } from '../../constants/employees-columns.const';
import { EmployeeTransformed, IEmployee } from '../../models/employee.model';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'cv-gen-employees-list.page',
  templateUrl: './employees-list.page.component.html',
  styleUrls: ['./employees-list.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesListPageComponent implements OnInit{
  public loaded$ = this.employeesFacade.loaded$

  isH2 = false;

  public data: Observable<EmployeeTransformed[]>;
  public cols: IColumns[] = EmployeesColumns;

  public readonly addEmployeePath = CREATE_EMPLOYEES.path;
  public readonly employeePath = EMPLOYEES.fullPath;

  constructor(
    private coreFacade: CoreFacade,
    private router: Router,
    private employeesFacade: EmployeesFacade
  ) {}

  public ngOnInit() {
    this.employeesFacade.loadEmployees();
    this.data = this.employeesFacade.employeesList$;
    this.coreFacade.setBreadcrumbs(BREADCRUMB_EMPLOYEE_LIST);
  }

  public navigateToEdit(data: unknown) {
    const employeeData = data as IEmployee;
    this.router.navigate([
      EMPLOYEES.path,
      EDIT_EMPLOYEES.path,
      employeeData.id,
    ]);
  }
}
