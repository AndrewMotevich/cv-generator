import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { CheckboxInputComponent } from './checkbox-input.component';
import { CheckboxInputModule } from './checkbox-input.module';

@Component({
  selector: 'cv-gen-mock-parent',
  template: `
    <cv-gen-checkbox-input
      [label]="label"
      [(ngModel)]="modelValue"
    ></cv-gen-checkbox-input>
  `,
})
class MockParentComponent {
  label = 'Text Input Label';
  modelValue = '';
}

describe('TextInputComponent', () => {
  let fixture: ComponentFixture<MockParentComponent>;
  let parentComponent: MockParentComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ... new CheckboxInputModule,
      declarations: [CheckboxInputComponent, MockParentComponent],
      imports: [FormsModule, ReactiveFormsModule, CheckboxModule],
    });

    fixture = TestBed.createComponent(MockParentComponent);
    parentComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the parent component', () => {
    expect(parentComponent).toBeTruthy();
  });

  it('should update value on user input', () => {
    const inputElement = fixture.nativeElement.querySelector('input');

    inputElement.value = 'User Typing';
    inputElement.dispatchEvent(new Event('input'));
  });
});
