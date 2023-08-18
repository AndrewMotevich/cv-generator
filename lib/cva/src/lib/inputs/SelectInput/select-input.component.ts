import { ChangeDetectorRef, Component, DoCheck, Input, Optional, Self } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { BaseInputClass } from '../../shared/classes/base-input.class';

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
