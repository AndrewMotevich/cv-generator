import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { EMPLOYEES } from '../../shared/constants/routing-paths.consts';
import { EmployeesApiService } from '../../shared/services/employees-api.service';
import * as EmployeesActions from './employees.actions';
import { ToastMessageService } from '../../shared/services/toast-messages.service';
import { EmployeesFacade } from './employees.facade';
import {
  VALUES_LOADED_FAILURE,
  VALUES_LOADED_SUCCESS,
  VALUE_ADDED_FAILURE,
  VALUE_ADDED_SUCCESS,
  VALUE_DELETED_FAILURE,
  VALUE_DELETED_SUCCESS,
  VALUE_LOADED_FAILURE,
  VALUE_LOADED_SUCCESS,
  VALUE_UPDATED_FAILURE,
  VALUE_UPDATED_SUCCESS,
} from '../../shared/constants/toasts-messages.consts';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class EmployeesEffects {
  constructor(
    private employeesFacade: EmployeesFacade,
    private employeesService: EmployeesApiService,
    private router: Router,
    private messageService: ToastMessageService,
    private translateService: TranslateService
  ) {}

  private translatedEmployees = this.translateService.instant('HEADER.EMPLOYEES');
  private translatedEmployee = this.translateService.instant('HEADER.EMPLOYEE');
  private actions$ = inject(Actions);

  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.getEmployees),
      tap(() => {
        this.employeesFacade.setLoadedFalse();
      }),
      switchMap(() =>
        this.employeesService.getEmployees().pipe(
          map((employees) => {
            this.messageService.showSuccessMessage(
              VALUES_LOADED_SUCCESS,
              this.translatedEmployees
            );
            return EmployeesActions.loadEmployeesSuccess({
              employees: employees,
            });
          }),
          catchError((error) => {
            this.messageService.showErrorMessage(
              VALUES_LOADED_FAILURE,
              this.translatedEmployees
            );
            return of(EmployeesActions.loadEmployeesFailure({ error }));
          })
        )
      ),
      tap(() => {
        this.employeesFacade.setLoadedTrue();
      })
    )
  );

  getById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.getEmployeeById),
      tap(() => {
        this.employeesFacade.setLoadedFalse();
      }),
      switchMap((action) =>
        this.employeesService.getEmployeeById(action.id).pipe(
          map((employee) => {
            this.messageService.showSuccessMessage(VALUE_LOADED_SUCCESS);
            return EmployeesActions.loadEmployeeByIdSuccess({ employee });
          }),
          catchError((error) => {
            this.messageService.showErrorMessage(VALUE_LOADED_FAILURE);
            return of(EmployeesActions.loadEmployeesFailure({ error }));
          })
        )
      ),
      tap(() => {
        this.employeesFacade.setLoadedTrue();
      })
    )
  );

  post$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.addEmployee),
      switchMap((action) =>
        this.employeesService.addEmployee(action.employee).pipe(
          map(() => {
            this.messageService.showSuccessMessage(VALUE_ADDED_SUCCESS);
            return EmployeesActions.addEmployeeSuccess();
          }),
          tap(() => {
            this.router.navigate([EMPLOYEES.path]);
          }),
          catchError((error) => {
            this.messageService.showErrorMessage(VALUE_ADDED_FAILURE);
            return of(EmployeesActions.addEmployeeFailure({ error }));
          })
        )
      )
    )
  );

  put$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.updateEmployee),
      switchMap((action) =>
        this.employeesService.updateEmployee(action.id, action.employee).pipe(
          map(() => {
            this.messageService.showSuccessMessage(VALUE_UPDATED_SUCCESS);
            return EmployeesActions.updateEmployeeSuccess();
          }),
          catchError((error) => {
            this.messageService.showErrorMessage(VALUE_UPDATED_FAILURE);
            return of(EmployeesActions.updateEmployeeFailure({ error }));
          })
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.deleteEmployee),
      switchMap((action) =>
        this.employeesService.deleteEmployee(action.id).pipe(
          map(() => {
            this.messageService.showSuccessMessage(VALUE_DELETED_SUCCESS);
            return EmployeesActions.deleteEmployeeSuccess();
          }),
          tap(() => {
            this.router.navigate([EMPLOYEES.path]);
          }),
          catchError((error) => {
            this.messageService.showErrorMessage(VALUE_DELETED_FAILURE);
            return of(EmployeesActions.deleteEmployeeFailure({ error }));
          })
        )
      )
    )
  );
}
