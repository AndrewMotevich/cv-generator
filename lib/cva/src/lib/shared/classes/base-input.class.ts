import { FormControl, NgControl } from '@angular/forms';

export class BaseInputClass {
  public control: FormControl;

  private _ngControl: NgControl;

  public currentErrorKey: string;

  constructor(control: FormControl, _ngControl: NgControl) {
    this.control = control;
    this._ngControl = _ngControl;
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

  public checkChanges() {
    if (this._ngControl.control.errors) {
      this.currentErrorKey = Object.keys(this._ngControl.control.errors)[0];
      this.control.setErrors(this._ngControl.control.errors);
    }
    if (this._ngControl.control?.touched) {
      this.control.markAsTouched();
    } else {
      this.control.markAsPristine();
    }
  }
}
