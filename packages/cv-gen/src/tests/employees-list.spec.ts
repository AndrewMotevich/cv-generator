import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { BREADCRUMB_EMPLOYEE_LIST } from '../app/employees/constants/breadcrumbs.consts';
import { EmployeesListPageComponent } from '../app/employees/pages/employees-list/employees-list.page.component';
import { CoreFacade } from '../app/ngrx/core/core.facade';
import { EmployeesFacade } from '../app/ngrx/employees/employees.facade';
import { BaseTable1Component } from '../app/shared/components/base-table1/base-table1.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

xdescribe('EmployeeListPageComponent', () => {
  let component: EmployeesListPageComponent;
  let fixture: ComponentFixture<EmployeesListPageComponent>;
  let employeesFacade: EmployeesFacade
  let coreFacade: CoreFacade

  const initialState = {
    common: {employees: {}}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeesListPageComponent],
      imports: [ProgressSpinnerModule, BaseTable1Component],
      providers: [
        provideMockStore({ initialState }),
        CoreFacade,
        EmployeesFacade,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeesListPageComponent);
    component = fixture.componentInstance;

    employeesFacade = TestBed.inject(EmployeesFacade);
    coreFacade = TestBed.inject(CoreFacade);

    employeesFacade.loadEmployees = jest.fn(() => {return})
    employeesFacade.employeesList$ = of([])
    coreFacade.setBreadcrumbs(BREADCRUMB_EMPLOYEE_LIST)

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.p-progress-spinner-svg'))
    ).toBeTruthy();
  });

  it('should show the table when loaded$ is truthy', waitForAsync(() => {
    component.loaded$ = of(true);

    // component.data = of([{
    //   id: 1,
    //   firstName: '',
    //   lastName: '',
    //   email: '',
    //   specialization: '',
    //   department: ''
    // }])

    component.isH2 = true
    fixture.detectChanges()
    const debugElem = fixture.debugElement.nativeElement.innerHTML
    console.log("1: ",debugElem);
    fixture.whenStable().then(() => {
      fixture.detectChanges()
      const debugElem = fixture.debugElement.nativeElement.innerHTML
      console.log("2: ",debugElem);
      // const table = fixture.nativeElement.querySelector('.table-wrapper');
      // expect(table).toBeTruthy();
    })

  }));

  it('should show the spinner template when loaded$ is falsy', async () => {
    component.loaded$ = of(false);

    component.isH2=true
    fixture.detectChanges();

    const debugElem = fixture.debugElement.nativeElement.innerHTML
    console.log(debugElem);
    const spinnerElement = fixture.debugElement.query(
      By.css('.p-progress-spinner-svg')
    );
    expect(spinnerElement).toBeTruthy();
  });
});
