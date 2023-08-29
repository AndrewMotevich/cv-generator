import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { EmployeesApiService } from '../../shared/services/employees-api.service';
import * as EmployeesActions from './employees.actions';

@Injectable()
export class EmployeesEffects {
  constructor(private employeesService: EmployeesApiService) {}

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
}
