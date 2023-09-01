import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { EmployeesFacade } from '../../../ngrx/employees/employees.facade';
import {
  CREATE_EMPLOYEES,
  EDIT_EMPLOYEES,
  EMPLOYEES,
} from '../../../shared/constants/routing-paths.consts';
import { IColumns } from '../../../shared/interfaces/columns.interfeces';
import { EmployeesColumns } from '../../constants/employees-columns.const';
import { EmployeeTransformed } from '../../models/employee.model';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'cv-gen-employees-list.page',
  templateUrl: './employees-list.page.component.html',
  styleUrls: ['./employees-list.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesListPageComponent implements OnInit {
  public data: Observable<EmployeeTransformed[]>;
  public cols: IColumns[] = EmployeesColumns;

  public readonly addEmployeePath = CREATE_EMPLOYEES.path;

  constructor(
    private router: Router,
    private employeesFacade: EmployeesFacade,
  ) {}

  ngOnInit() {
    this.employeesFacade.loadEmployees();
    this.data = this.employeesFacade.employeesList$;
  }

  public navigateToEdit(data: unknown) {
    this.router.navigate([
      EMPLOYEES.path,
      EDIT_EMPLOYEES.path,
      (data as { id: number }).id,
    ]);
  }
}
