import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordInputModule } from './password-input.module';
import { PasswordInputComponent } from './password-input.component';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'cv-gen-mock-parent',
  template: `
    <cv-gen-password-input
      [placeholder]="placeholder"
      [label]="label"
      [(ngModel)]="modelValue"
    ></cv-gen-password-input>
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
      ...new PasswordInputModule(),
      declarations: [PasswordInputComponent, MockParentComponent],
      imports: [FormsModule, ReactiveFormsModule, PasswordModule],
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

    inputElement.value = 'Password';
    inputElement.dispatchEvent(new Event('input'));

    expect(parentComponent.modelValue).toBe('Password');
  });
});
