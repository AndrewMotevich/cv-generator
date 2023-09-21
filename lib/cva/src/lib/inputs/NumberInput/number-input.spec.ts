import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberInputModule } from './number-input.module';
import { NumberInputComponent } from './number-input.component';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'cv-gen-mock-parent',
  template: `
    <cv-gen-number-input
      [placeholder]="placeholder"
      [label]="label"
      [(ngModel)]="modelValue"
    ></cv-gen-number-input>
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
      ...new NumberInputModule(),
      declarations: [NumberInputComponent, MockParentComponent],
      imports: [FormsModule, ReactiveFormsModule, InputNumberModule],
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

    inputElement.value = 4
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
  });
});
