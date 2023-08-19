import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  Input,
  Optional,
  Self,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { BaseInputClass } from '../../shared/classes/base-input.class';

@Component({
  selector: 'cv-gen-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
})
export class DateInputComponent extends BaseInputClass implements DoCheck {
  @Input() public label: string;
  @Input() public placeholder: string;

  constructor(
    @Self() @Optional() ngControl: NgControl,
    cdRef: ChangeDetectorRef
  ) {
    super(ngControl, cdRef);
    this.ngControl.valueAccessor = this;
  }
}
