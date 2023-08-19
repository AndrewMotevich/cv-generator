import { ChangeDetectorRef, Component, DoCheck, Input, Optional, Self } from '@angular/core';
import { BaseInputClass } from '../../shared/classes/base-input.class';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'cv-gen-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
})
export class PasswordInputComponent extends BaseInputClass implements DoCheck {
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
