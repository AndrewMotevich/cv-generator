import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseTable1Component } from './base-table1.component';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import { IColumns } from '../../interfaces/columns.interfeces';
import { EmployeesColumns } from '../../../employees/constants/employees-columns.const';

describe('BaseTable1Component', () => {
  let component: BaseTable1Component;
  let fixture: ComponentFixture<BaseTable1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseTable1Component, TableModule, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseTable1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have data input', () => {
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
    component.data = testData;
    expect(component.data).toEqual(testData);
  });

  it('should have cols input', () => {
    const testCols: IColumns[] = EmployeesColumns;
    component.cols = testCols;
    expect(component.cols).toEqual(testCols);
  });

  it('should emit itemInfo', () => {
    const testItem: unknown = {
      id: 1,
      firstName: 'A',
      lastName: 'B',
      email: 'C',
      department: 'D',
      specialization: 'E',
    };
    let emittedItem: unknown;

    component.itemInfo.subscribe((item) => {
      emittedItem = item;
    });

    component.sendItemInfo(testItem);

    expect(emittedItem).toEqual(testItem);
  });
});
