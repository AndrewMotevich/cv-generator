import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseTable1Component } from './base-table1.component';

describe('BaseTable1Component', () => {
  let component: BaseTable1Component;
  let fixture: ComponentFixture<BaseTable1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseTable1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseTable1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
