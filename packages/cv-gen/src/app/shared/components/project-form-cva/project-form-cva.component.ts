import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  DoCheck,
  Optional,
  Self,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormBuilder,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'cv-gen-project-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './project-form-cva.component.html',
  styleUrls: ['./project-form-cva.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFormComponent
  implements ControlValueAccessor, OnInit, DoCheck
{
  public projectForm = this.formBuilder.group({
    firstName: '',
    lastName: '',
  });

  private onChange: (val: unknown) => void;
  private onTouch: (val: unknown) => void;

  constructor(
    @Self() @Optional() private ngControl: NgControl,
    private formBuilder: FormBuilder,
    protected cdRef: ChangeDetectorRef
  ) {
    this.ngControl.valueAccessor = this;
  }

  public ngOnInit() {
    this.projectForm.valueChanges.subscribe(() => {
      this.onChange(this.projectForm.value);
    });
  }

  public writeValue(value: unknown) {
    this.projectForm.patchValue(value, { emitEvent: false });
  }

  public registerOnChange(fn: (val: unknown) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: (val: unknown) => void) {
    this.onTouch = fn;
  }

  public ngDoCheck() {
    if (this.ngControl.control.errors) {
      // this.control.setErrors(this.ngControl.control.errors);
      this.cdRef.markForCheck();
    }
    if (this.ngControl.control?.dirty) {
      // this.control.markAsDirty();
    } else {
      // this.control.markAsPristine();
    }
  }
}
