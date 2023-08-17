import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  Input,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'cv-gen-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent
  implements ControlValueAccessor, OnInit, DoCheck
{
  @Input() public label: string;
  @Input() public errorMessages: { [key: string]: string };

  public control: FormControl = new FormControl('');

  public currentErrorKey: string;

  private onChange: (val: string) => void;

  private onTouch: (val: string) => void;

  constructor(
    @Self() @Optional() private ngControl: NgControl,
    private changeDetection: ChangeDetectorRef
  ) {
    this.ngControl.valueAccessor = this;
  }

  public ngOnInit(): void {
    this.control.valueChanges.subscribe((res) => {
      this.onChange(res || '');
    });
  }

  public ngDoCheck(): void {
    if (this.ngControl.control.errors) {
      this.currentErrorKey = Object.keys(this.ngControl.control.errors)[0]
      this.control.setErrors(this.ngControl.control.errors);
      this.changeDetection.markForCheck();
    }
    if (this.ngControl.control?.touched) {
      this.control.markAsTouched();
    } else {
      this.control.markAsPristine();
    }
  }

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
