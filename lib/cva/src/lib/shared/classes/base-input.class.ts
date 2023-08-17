import { FormControl } from '@angular/forms';

export class BaseInputClass {
  control: FormControl;

  constructor(control: FormControl) {
    this.control = control;
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
}
