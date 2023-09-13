import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { EMPLOYEES as employeeUrl } from '../../shared/constants/routing-paths.consts';
import {
  EMPLOYEE,
  EMPLOYEES,
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
import { EmployeesApiService } from '../../shared/services/employees-api.service';
import { ToastMessageService } from '../../shared/services/toast-messages.service';
import * as EmployeesActions from './employees.actions';
import { EmployeesFacade } from './employees.facade';
import { CvsFacade } from '../cvs/cvs.facade';

@Injectable({ providedIn: 'root' })
export class EmployeesEffects {
  constructor(
    private cvsFacade: CvsFacade,
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
            this.messageService.showSuccessMessage(
              VALUES_LOADED_SUCCESS,
              EMPLOYEES
            );
            return EmployeesActions.loadEmployeesSuccess({
              employees: employees,
            });
          }),
          catchError((error) => {
            this.messageService.showErrorMessage(
              VALUES_LOADED_FAILURE,
              EMPLOYEES
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
            this.messageService.showSuccessMessage(
              VALUE_LOADED_SUCCESS,
              EMPLOYEE
            );
            return EmployeesActions.loadEmployeeByIdSuccess({ employee });
          }),
          catchError((error) => {
            this.messageService.showErrorMessage(
              VALUE_LOADED_FAILURE,
              EMPLOYEE
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

  post$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.addEmployee),
      switchMap((action) =>
        this.employeesService.addEmployee(action.employee).pipe(
          map((res) => {
            this.cvsFacade.addCvsToNewEmployee(res.id)
            this.messageService.showSuccessMessage(
              VALUE_ADDED_SUCCESS,
              EMPLOYEE
            );
            return EmployeesActions.addEmployeeSuccess();
          }),
          tap(() => {
            this.router.navigate([employeeUrl.path]);
          }),
          catchError((error) => {
            this.messageService.showErrorMessage(VALUE_ADDED_FAILURE, EMPLOYEE);
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
            this.messageService.showSuccessMessage(
              VALUE_UPDATED_SUCCESS,
              EMPLOYEE
            );
            return EmployeesActions.updateEmployeeSuccess();
          }),
          catchError((error) => {
            this.messageService.showErrorMessage(
              VALUE_UPDATED_FAILURE,
              EMPLOYEE
            );
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
            this.messageService.showSuccessMessage(
              VALUE_DELETED_SUCCESS,
              EMPLOYEE
            );
            return EmployeesActions.deleteEmployeeSuccess();
          }),
          tap(() => {
            this.router.navigate([employeeUrl.path]);
          }),
          catchError((error) => {
            this.messageService.showErrorMessage(
              VALUE_DELETED_FAILURE,
              EMPLOYEE
            );
            return of(EmployeesActions.deleteEmployeeFailure({ error }));
          })
        )
      )
    )
  );
}
