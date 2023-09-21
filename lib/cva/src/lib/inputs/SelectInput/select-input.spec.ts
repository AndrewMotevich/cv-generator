import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SelectInputComponent } from './select-input.component';
import { SelectInputModule } from './select-input.module';

@Component({
  selector: 'cv-gen-mock-parent',
  template: `
    <cv-gen-select-input
      [placeholder]="placeholder"
      [label]="label"
      [options]="options"
      [(ngModel)]="modelValue"
    ></cv-gen-select-input>
  `,
})
class MockParentComponent {
  options = ['option1', 'option2']
  placeholder = 'Enter text';
  label = 'Text Input Label';
  modelValue = '';
}

describe('TextInputComponent', () => {
  let fixture: ComponentFixture<MockParentComponent>;
  let parentComponent: MockParentComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ... new SelectInputModule,
      declarations: [SelectInputComponent, MockParentComponent],
      imports: [FormsModule, ReactiveFormsModule, DropdownModule],
    });

    fixture = TestBed.createComponent(MockParentComponent);
    parentComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the parent component', () => {
    expect(parentComponent).toBeTruthy();
  });
});
