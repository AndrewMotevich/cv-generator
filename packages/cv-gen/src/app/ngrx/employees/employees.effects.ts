import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { EMPLOYEES } from '../../shared/constants/routing-paths.consts';
import { EmployeesApiService } from '../../shared/services/employees-api.service';
import * as EmployeesActions from './employees.actions';
import { ToastMessageService } from '../../shared/services/toast-messages.service';

@Injectable()
export class EmployeesEffects {
  constructor(
    private employeesService: EmployeesApiService,
    private router: Router,
    private errorsService: ToastMessageService
  ) {}

  private actions$ = inject(Actions);

  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.getEmployees),
      switchMap(() =>
        this.employeesService.getEmployees().pipe(
          map((employees) =>
            EmployeesActions.loadEmployeesSuccess({ employees: employees })
          ),
          catchError((error) => {
            this.errorsService.showErrorMessage(error.message);
            return of(EmployeesActions.loadEmployeesFailure({ error }));
          })
        )
      )
    )
  );

  getById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.getEmployeeById),
      switchMap((action) =>
        this.employeesService.getEmployeeById(action.id).pipe(
          map((employee) =>
            EmployeesActions.loadEmployeeByIdSuccess({ employee })
          ),
          catchError((error) => {
            this.errorsService.showErrorMessage(error.message);
            return of(EmployeesActions.loadEmployeesFailure({ error }));
          })
        )
      )
    )
  );

  post$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.addEmployee),
      switchMap((action) =>
        this.employeesService.addEmployee(action.employee).pipe(
          map(() => EmployeesActions.addEmployeeSuccess()),
          tap(() => {
            this.router.navigate([EMPLOYEES.path]);
          }),
          catchError((error) => {
            this.errorsService.showErrorMessage(error.message);
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
          map(() => EmployeesActions.updateEmployeeSuccess()),
          catchError((error) => {
            this.errorsService.showErrorMessage(error.message);
            return of(EmployeesActions.updateEmployeeFailure({ error }));
          })
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.deleteEmployee),
      switchMap((action) => this.employeesService.deleteEmployee(action.id).pipe(
        map(() => EmployeesActions.deleteEmployeeSuccess()),
        tap(() => {
          this.router.navigate([EMPLOYEES.path]);
        }),
        catchError((error) => {
          this.errorsService.showErrorMessage(error.message);
          return of(EmployeesActions.deleteEmployeeFailure({ error }));
        })
      )),
    )
  );
}
