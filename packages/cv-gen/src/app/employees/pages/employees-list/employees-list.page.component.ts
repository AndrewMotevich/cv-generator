import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { EmployeesFacade } from '../../../ngrx/employees/employees.facade';
import {
  EDIT_EMPLOYEES,
  EMPLOYEES,
} from '../../../shared/constants/routing-paths.consts';
import { IColumns } from '../../../shared/interfaces/columns.interfeces';
import { EmployeesColumns } from '../../constants/employees-columns.const';
import { EmployeeTransformed } from '../../models/employee.model';
import { Observable } from 'rxjs';
import { CvsFacade } from '../../../ngrx/cvs/cvs.facade';
import { SharedFacade } from '../../../ngrx/shared/shared.facade';

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

  public readonly addEmployeePath = EMPLOYEES.fullPath + EMPLOYEES.fullPath;

  constructor(
    private router: Router,
    private employeesFacade: EmployeesFacade,
    private cvsFacade: CvsFacade,
    private sharedFacade: SharedFacade
  ) {}

  ngOnInit() {
    this.sharedFacade.getAllShared()
    this.cvsFacade.loadCvs();
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
