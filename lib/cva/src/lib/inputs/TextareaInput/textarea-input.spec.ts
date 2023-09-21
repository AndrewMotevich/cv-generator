import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextareaInputComponent } from './textarea-input.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TextareaModule } from './textarea-input.module';

@Component({
  selector: 'cv-gen-mock-parent',
  template: `
    <cv-gen-textarea-input
      [placeholder]="placeholder"
      [label]="label"
      [(ngModel)]="modelValue"
    ></cv-gen-textarea-input>
  `,
})
class MockParentComponent {
  placeholder = 'Enter text';
  label = 'Text Input Label';
  modelValue = '';
}

describe('TextInputComponent', () => {
  let fixture: ComponentFixture<MockParentComponent>;
  let parentComponent: MockParentComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ... new TextareaModule,
      declarations: [TextareaInputComponent, MockParentComponent],
      imports: [FormsModule, ReactiveFormsModule, InputTextareaModule],
    });

    fixture = TestBed.createComponent(MockParentComponent);
    parentComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the parent component', () => {
    expect(parentComponent).toBeTruthy();
  });


  it('should update value on user input', () => {
    const inputElement = fixture.nativeElement.querySelector('textarea');

    inputElement.value = 'User Typing';
    inputElement.dispatchEvent(new Event('input'));

    expect(parentComponent.modelValue).toBe('User Typing');
  });
});
