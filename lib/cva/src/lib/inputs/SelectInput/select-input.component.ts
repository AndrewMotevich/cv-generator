import { ChangeDetectorRef, Component, DoCheck, Input, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
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

  constructor(
    @Self() @Optional() ngControl: NgControl,
    cdRef: ChangeDetectorRef
  ) {
    super(ngControl, cdRef);
    this.ngControl.valueAccessor = this;
  }
}
