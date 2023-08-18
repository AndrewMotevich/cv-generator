import { ChangeDetectorRef, Component, DoCheck, Input, Optional, Self } from '@angular/core';
import { BaseInputClass } from '../shared/classes/base-input.class';
import { FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'cv-gen-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
})
export class NumberInputComponent extends BaseInputClass implements DoCheck {
  @Input() public errorMessages: { [key: string]: string };
  @Input() label: string
  @Input() placeholder: string
  @Input() options: unknown[]

  public override control: FormControl

  public override currentErrorKey: string;

  constructor(
    @Self() @Optional() private ngControl: NgControl,
    private changeDetection: ChangeDetectorRef
  ) {
    super(new FormControl(''), ngControl);
    this.ngControl.valueAccessor = this;
  }

  public ngDoCheck(): void {
    this.checkChanges()
    this.changeDetection.markForCheck()
  }
}
