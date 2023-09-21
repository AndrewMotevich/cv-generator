import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextInputComponent } from './text-input.component';
import { TextInputModule } from './text-input.module';

@Component({
  selector: 'cv-gen-mock-parent',
  template: `
    <cv-gen-text-input
      [placeholder]="placeholder"
      [label]="label"
      [leftIcon]="leftIcon"
      [formControl]="textInput"
    ></cv-gen-text-input>
  `,
})
class MockParentComponent {
  textInput = new FormControl('', [
    Validators.minLength(8),
    Validators.maxLength(10),
  ]);
  placeholder = 'Enter text';
  label = 'Text Input Label';
  leftIcon = 'icon-left';

  submit(): void | string {
    if (this.textInput.invalid) {
      this.textInput.markAllAsTouched();
      return;
    }
    return this.textInput.value;
  }
}

describe('TextInputComponent', () => {
  let fixture: ComponentFixture<MockParentComponent>;
  let parentComponent: MockParentComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ... new TextInputModule,
      declarations: [TextInputComponent, MockParentComponent],
      imports: [FormsModule, ReactiveFormsModule, InputTextModule],
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

    expect(parentComponent.textInput.value).toBe('User Typing');
  });

  it('should be invalid if length less than 8', () => {
    const inputElement = fixture.nativeElement.querySelector('input');

    inputElement.value = 'User';
    inputElement.dispatchEvent(new Event('input'));

    parentComponent.submit();

    expect(parentComponent.textInput.invalid).toBeTruthy();
  });

  it('should be invalid if length more than 10', () => {
    const inputElement = fixture.nativeElement.querySelector('input');

    inputElement.value = 'User1234567';
    inputElement.dispatchEvent(new Event('input'));

    parentComponent.submit();

    expect(parentComponent.textInput.invalid).toBeTruthy();
  });
});
