import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Optional,
  Self,
} from '@angular/core';
import { BaseInputClass } from '../../shared/classes/base-input.class';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'cv-gen-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberInputComponent extends BaseInputClass {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() options: unknown[];

  constructor(
    @Self() @Optional() ngControl: NgControl,
    cdRef: ChangeDetectorRef
  ) {
    super(ngControl, cdRef);
    this.ngControl.valueAccessor = this;
  }
}
