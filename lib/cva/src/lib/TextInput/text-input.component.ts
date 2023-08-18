import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  Input,
  Optional,
  Self,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { BaseInputClass } from '../shared/classes/base-input.class';

@Component({
  selector: 'cv-gen-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent extends BaseInputClass
  implements ControlValueAccessor, DoCheck
{
  @Input() public errorMessages: { [key: string]: string };
  @Input() public placeholder: string;
  @Input() public label: string;
  @Input() public leftIcon: string;
  @Input() public disabled: boolean;

  public override control: FormControl

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
