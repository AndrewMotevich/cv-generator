import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppModule } from '../app/app.module';
import { AuthModule } from '../app/auth/auth.module';
import { EmployeesModule } from '../app/employees/employees.module';
import { EmployeesListPageComponent } from '../app/employees/pages/employees-list/employees-list.page.component';
import { CoreFacade } from '../app/ngrx/core/core.facade';
import { EmployeesFacade } from '../app/ngrx/employees/employees.facade';

describe('EmployeeListPageComponent', () => {
  let fixture: ComponentFixture<EmployeesListPageComponent>;
  let component: EmployeesListPageComponent;
  let employeesFacade: EmployeesFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeesListPageComponent],
      imports: [EmployeesModule, AppModule, AuthModule],
      providers: [CoreFacade, EmployeesFacade],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeesListPageComponent);
    component = fixture.componentInstance;
    component.loaded$ = of(true);

    employeesFacade = TestBed.inject(EmployeesFacade);
    employeesFacade.loadEmployees = () => {
      /* */
    };

    fixture.detectChanges();
  });

  it('table should created and be empty', () => {
    cy.get('p-table').should('exist');
    cy.contains('td').should('not.exist');
    fixture.detectChanges();
  });

  it('should add mock Employees to table',() => {
    fixture = TestBed.createComponent(EmployeesListPageComponent);
    component = fixture.componentInstance;
    component.loaded$ = of(true);
    employeesFacade.employeesList$ = of([
      {
        id: 1,
        firstName: 'A',
        lastName: 'B',
        email: 'C',
        department: 'D',
        specialization: 'E',
      },
    ]);
    fixture.detectChanges();

    cy.contains('td', 'A').should('exist');
  });

  it('should be progress spinner', () => {
    fixture = TestBed.createComponent(EmployeesListPageComponent);
    component.loaded$ = of(false);
    fixture.detectChanges();
    cy.get('p-progressspinner').should('exist')
  })
});
