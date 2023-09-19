import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeesColumns } from '../../../employees/constants/employees-columns.const';
import { IColumns } from '../../interfaces/columns.interfeces';
import { BaseTable1Component } from './base-table1.component';

describe('BaseTable1Component', () => {
  let component: BaseTable1Component;
  let fixture: ComponentFixture<BaseTable1Component>;
  const testData: unknown[] = [
    {
      id: 1,
      firstName: 'A',
      lastName: 'B',
      email: 'C',
      department: 'D',
      specialization: 'E',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseTable1Component],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(BaseTable1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have data input', () => {
    component.data = testData;
    expect(component.data).toEqual(testData);
  });

  it('should have cols input', () => {
    const testCols: IColumns[] = EmployeesColumns;
    component.cols = testCols;
    expect(component.cols).toEqual(testCols);
  });

  it('should emit itemInfo', () => {
    let emittedItem: unknown;
    component.itemInfo.subscribe((item) => {
      emittedItem = item;
    });
    component.sendItemInfo(testData);
    expect(emittedItem).toEqual(testData);
  });
});
