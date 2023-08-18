import { ChangeDetectorRef, Component, DoCheck, Input, Optional, Self } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { BaseInputClass } from '../shared/classes/base-input.class';

@Component({
  selector: 'cv-gen-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
})
export class SelectInputComponent extends BaseInputClass implements DoCheck{
  @Input() public errorMessages: { [key: string]: string };
  @Input() label: string
  @Input() placeholder: string
  @Input() options: unknown[]

  override control: FormControl

  public currentErrorKey: string;

  constructor(
    @Self() @Optional() private ngControl: NgControl,
    private changeDetection: ChangeDetectorRef
  ) {
    super(new FormControl(''))
    this.ngControl.valueAccessor = this;
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
}
