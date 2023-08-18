import { ChangeDetectorRef, Component, DoCheck, Input, Optional, Self } from '@angular/core';
import { BaseInputClass } from '../../shared/classes/base-input.class';
import { FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'cv-gen-textarea-input',
  templateUrl: './textarea-input.component.html',
  styleUrls: ['./textarea-input.component.scss'],
})
export class TextareaInputComponent extends BaseInputClass implements DoCheck {
  @Input() public errorMessages: { [key: string]: string };
  @Input() public label: string;
  @Input() public placeholder: string;
  @Input() public rows = 5;
  @Input() public cols = 5;

  override control: FormControl;

  override currentErrorKey: string;

  constructor(
    @Self() @Optional() private ngControl: NgControl,
    private changeDetection: ChangeDetectorRef
  ) {
    super(new FormControl(''), ngControl);
    this.ngControl.valueAccessor = this;
  }

  public ngDoCheck(): void {
    this.checkChanges();
    this.changeDetection.markForCheck();
  }
}
