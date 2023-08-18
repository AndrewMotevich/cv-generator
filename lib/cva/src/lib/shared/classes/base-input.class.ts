import { ChangeDetectorRef, Directive, DoCheck, OnInit } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';

@Directive()
export class BaseInputClass implements OnInit, DoCheck {
  public control: FormControl = new FormControl('');


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
      this.control.setErrors(this.ngControl.control.errors);
      this.cdRef.markForCheck();
    }
    if (this.ngControl.control?.dirty) {
      this.control.markAsDirty();
    } else {
      this.control.markAsPristine();
    }
  }
}
