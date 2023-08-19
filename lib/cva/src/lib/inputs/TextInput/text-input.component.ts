import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  Input,
  Optional,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { BaseInputClass } from '../../shared/classes/base-input.class';

@Component({
  selector: 'cv-gen-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent extends BaseInputClass
  implements ControlValueAccessor, DoCheck
{
  @Input() public placeholder: string;
  @Input() public label: string;
  @Input() public leftIcon: string;
  @Input() public disabled: boolean;

  constructor(
    @Self() @Optional() ngControl: NgControl,
    cdRef: ChangeDetectorRef,
  ) {
    super(ngControl, cdRef);
    this.ngControl.valueAccessor = this;
  }
}
