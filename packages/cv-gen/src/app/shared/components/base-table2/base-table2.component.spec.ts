import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseTable2Component } from './base-table2.component';

describe('BaseTable2Component', () => {
  let component: BaseTable2Component;
  let fixture: ComponentFixture<BaseTable2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseTable2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseTable2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
