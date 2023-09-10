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
  EMPLOYEES_LOADED_FAILURE,
  EMPLOYEES_LOADED_SUCCESS,
  EMPLOYEE_ADDED_FAILURE,
  EMPLOYEE_ADDED_SUCCESS,
  EMPLOYEE_DELETED_FAILURE,
  EMPLOYEE_DELETED_SUCCESS,
  EMPLOYEE_LOADED_FAILURE,
  EMPLOYEE_LOADED_SUCCESS,
  EMPLOYEE_UPDATED_FAILURE,
  EMPLOYEE_UPDATED_SUCCESS,
} from '../../shared/constants/toasts-messages.consts';

@Injectable()
export class EmployeesEffects {
  constructor(
    private employeesFacade: EmployeesFacade,
    private employeesService: EmployeesApiService,
    private router: Router,
    private messageService: ToastMessageService
  ) {}

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
            this.messageService.showSuccessMessage(EMPLOYEES_LOADED_SUCCESS);
            return EmployeesActions.loadEmployeesSuccess({
              employees: employees,
            });
          }),
          catchError((error) => {
            this.messageService.showErrorMessage(EMPLOYEES_LOADED_FAILURE);
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
            this.messageService.showSuccessMessage(EMPLOYEE_LOADED_SUCCESS);
            return EmployeesActions.loadEmployeeByIdSuccess({ employee });
          }),
          catchError((error) => {
            this.messageService.showErrorMessage(EMPLOYEE_LOADED_FAILURE);
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
            this.messageService.showSuccessMessage(EMPLOYEE_ADDED_SUCCESS);
            return EmployeesActions.addEmployeeSuccess();
          }),
          tap(() => {
            this.router.navigate([EMPLOYEES.path]);
          }),
          catchError((error) => {
            this.messageService.showErrorMessage(EMPLOYEE_ADDED_FAILURE);
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
            this.messageService.showSuccessMessage(EMPLOYEE_UPDATED_SUCCESS);
            return EmployeesActions.updateEmployeeSuccess();
          }),
          catchError((error) => {
            this.messageService.showErrorMessage(EMPLOYEE_UPDATED_FAILURE);
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
            this.messageService.showSuccessMessage(EMPLOYEE_DELETED_SUCCESS);
            return EmployeesActions.deleteEmployeeSuccess();
          }),
          tap(() => {
            this.router.navigate([EMPLOYEES.path]);
          }),
          catchError((error) => {
            this.messageService.showErrorMessage(EMPLOYEE_DELETED_FAILURE);
            return of(EmployeesActions.deleteEmployeeFailure({ error }));
          })
        )
      )
    )
  );
}
