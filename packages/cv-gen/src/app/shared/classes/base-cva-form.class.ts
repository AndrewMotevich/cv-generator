import { ChangeDetectorRef, Directive, DoCheck, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgControl } from '@angular/forms';
import { markAllAsDirty } from '../utils/mark-as-dirty.util';

@Directive()
export class BaseCvaForm implements OnInit, DoCheck {
  public form: FormGroup;

  public onChange: (val: unknown) => void;
  private onTouch: (val: unknown) => void;

  constructor(
    protected ngControl: NgControl,
    private formControls: { [key: string]: FormControl | FormArray },
    protected cdRef: ChangeDetectorRef
  ) {
    this.form = new FormGroup(this.formControls);
  }

  public ngOnInit() {
    this.form.valueChanges.subscribe(() => {
      this.onChange(this.form.value);
    });
  }

  public writeValue(value: unknown) {
    this.form.patchValue(value, { emitEvent: false });
  }

  public registerOnChange(fn: (val: unknown) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: (val: unknown) => void) {
    this.onTouch = fn;
  }

  public ngDoCheck() {
    if (this.form.invalid) {
      this.ngControl.control.setErrors({ cvaFormError: true });
      if (this.ngControl.control.touched) {
        markAllAsDirty(this.form.controls);
      }
      if(this.ngControl.control.untouched){
        this.form.markAsPristine()
      }
      this.cdRef.markForCheck();
    }
  }
}
