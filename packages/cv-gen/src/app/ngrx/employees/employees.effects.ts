import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { EMPLOYEES } from '../../shared/constants/routing-paths.consts';
import { EmployeesApiService } from '../../shared/services/employees-api.service';
import * as EmployeesActions from './employees.actions';

@Injectable()
export class EmployeesEffects {
  constructor(
    private employeesService: EmployeesApiService,
    private router: Router
  ) {}

  private actions$ = inject(Actions);

  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.getEmployees),
      switchMap(() => this.employeesService.getEmployees()),
      map((employees) =>
        EmployeesActions.loadEmployeesSuccess({ employees: employees })
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(EmployeesActions.loadEmployeesFailure({ error }));
      })
    )
  );

  getById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.getEmployeeById),
      switchMap((action) => this.employeesService.getEmployeeById(action.id)),
      map((employee) => EmployeesActions.loadEmployeeByIdSuccess({ employee })),
      catchError((error) => {
        console.error('Error', error);
        return of(EmployeesActions.loadEmployeesFailure({ error }));
      })
    )
  );

  post$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.addEmployee),
      switchMap((action) => this.employeesService.addEmployee(action.employee)),
      map(() => EmployeesActions.addEmployeeSuccess()),
      tap(() => {
        this.router.navigate([EMPLOYEES.path]);
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(EmployeesActions.addEmployeeFailure({ error }));
      })
    )
  );

  put$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.updateEmployee),
      switchMap((action) =>
        this.employeesService.updateEmployee(action.id, action.employee)
      ),
      map(() => EmployeesActions.updateEmployeeSuccess()),
      catchError((error) => {
        console.error('Error', error);
        return of(EmployeesActions.updateEmployeeFailure({ error }));
      })
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.deleteEmployee),
      switchMap((action) => this.employeesService.deleteEmployee(action.id)),
      map(() => EmployeesActions.deleteEmployeeSuccess()),
      tap(() => {
        this.router.navigate([EMPLOYEES.path]);
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(EmployeesActions.deleteEmployeeFailure({ error }));
      })
    )
  );
}
