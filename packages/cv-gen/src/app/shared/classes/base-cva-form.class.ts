import { ChangeDetectorRef, Directive, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgControl } from '@angular/forms';

@Directive()
export class BaseCvaForm implements OnInit {
  public form: FormGroup;

  private onChange: (val: unknown) => void;
  private onTouch: (val: unknown) => void;

  constructor(
    protected ngControl: NgControl,
    private formControls: { [key: string]: FormControl },
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
}
