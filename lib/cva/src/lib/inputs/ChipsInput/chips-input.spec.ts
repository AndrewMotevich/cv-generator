import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChipsInputComponent } from './chips-input.component';
import { ChipsInputModule } from './chips-input.module';

@Component({
  selector: 'cv-gen-mock-parent',
  template: `
    <cv-gen-chips-input
      [placeholder]="placeholder"
      [label]="label"
      [formControl]='chips'
    ></cv-gen-chips-input>
  `,
})
class MockParentComponent {
  placeholder = 'Enter text';
  label = 'Text Input Label';
  modelValue = '';
  chips = new FormControl([])
}

describe('TextInputComponent', () => {
  let fixture: ComponentFixture<MockParentComponent>;
  let parentComponent: MockParentComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      ... new ChipsInputModule,
      declarations: [ChipsInputComponent, MockParentComponent],
      imports: [FormsModule, ReactiveFormsModule, AutoCompleteModule],
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

    inputElement.value = 'Angular';
    inputElement.dispatchEvent(new Event('input'))
    inputElement.dispatchEvent(new KeyboardEvent('keyup', {key: 'Enter'}))

    fixture.detectChanges()
    expect(inputElement.value).toBe('Angular')
  });
});
