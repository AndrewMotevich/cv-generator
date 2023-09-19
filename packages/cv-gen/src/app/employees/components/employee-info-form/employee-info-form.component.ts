import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl
} from '@angular/forms';
import { SharedFacade } from '../../../ngrx/shared/shared.facade';
import { BaseCvaForm } from '../../../shared/classes/base-cva-form.class';
import { EMPLOYEE_CONTROLS } from '../../constants/employee-form-controls.const';

@Component({
  selector: 'cv-gen-info-form',
  templateUrl: './employee-info-form.component.html',
  styleUrls: ['./employee-info-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeInfoFormComponent
  extends BaseCvaForm
  implements ControlValueAccessor, OnInit
{
  public departments$ = this.sharedFacade.departments$;
  public specializations$ = this.sharedFacade.specializations$;

  constructor(
    private sharedFacade: SharedFacade,
    public override ngControl: NgControl,
    private cdr: ChangeDetectorRef
  ) {
    super(ngControl, EMPLOYEE_CONTROLS, cdr);
    this.ngControl.valueAccessor = this;
    this.sharedFacade.getAllShared();
  }
}
