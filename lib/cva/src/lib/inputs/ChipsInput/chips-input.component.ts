import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  Input,
  Optional,
  Self,
} from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { BaseInputClass } from '../shared/classes/base-input.class';

@Component({
  selector: 'cv-gen-chips-input',
  templateUrl: './chips-input.component.html',
  styleUrls: ['./chips-input.component.scss'],
})
export class ChipsInputComponent extends BaseInputClass implements DoCheck {
  @Input() public errorMessages: { [key: string]: string };
  @Input() public label: string;
  @Input() public placeholder: string;

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
