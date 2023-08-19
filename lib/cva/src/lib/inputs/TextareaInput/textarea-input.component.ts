import { ChangeDetectorRef, Component, DoCheck, Input, Optional, Self } from '@angular/core';
import { BaseInputClass } from '../../shared/classes/base-input.class';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'cv-gen-textarea-input',
  templateUrl: './textarea-input.component.html',
  styleUrls: ['./textarea-input.component.scss'],
})
export class TextareaInputComponent extends BaseInputClass implements DoCheck {
  @Input() public label: string;
  @Input() public placeholder: string;
  @Input() public rows = 5;
  @Input() public cols = 5;

  constructor(
    @Self() @Optional() ngControl: NgControl,
    cdRef: ChangeDetectorRef
  ) {
    super(ngControl, cdRef);
    this.ngControl.valueAccessor = this;
  }
}
