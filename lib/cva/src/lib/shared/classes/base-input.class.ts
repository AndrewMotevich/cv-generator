import { ChangeDetectorRef, Directive, DoCheck, OnInit } from '@angular/core';
import { FormControl, NgControl, ValidationErrors } from '@angular/forms';

@Directive()
export class BaseInputClass implements OnInit, DoCheck {
  public control: FormControl = new FormControl('');

  public maxlength: number;
  public minlength: number;

  constructor(
    protected ngControl: NgControl,
    protected cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.control.valueChanges.subscribe((res) => {
      this.onChange(res || '');
    });
  }

  private onChange: (val: string) => void;
  private onTouch: (val: string) => void;

  public writeValue(value: string) {
    this.control.setValue(value, { emitEvent: false });
  }

  public registerOnChange(fn: (val: string) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: (val: string) => void) {
    this.onTouch = fn;
  }

  public ngDoCheck() {
    if (this.ngControl.control.errors) {
      this.setValidatorsValues(this.ngControl.control.errors);
      this.control.setErrors(this.ngControl.control.errors);
    }
    if (this.ngControl.control?.dirty) {
      this.control.markAsDirty();
    } else {
      this.control.markAsPristine();
    }
    this.cdRef.markForCheck();
  }

  private setValidatorsValues(error: ValidationErrors) {
    if (error['minlength']) {
      this.minlength = error['minlength']?.requiredLength;
    }
    if (error['maxlength']) {
      this.maxlength = error['maxlength']?.requiredLength;
    }
  }
}
