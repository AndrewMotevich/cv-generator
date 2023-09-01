import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  Validators,
} from '@angular/forms';
import { SharedFacade } from '../../../ngrx/shared/shared.facade';
import { BaseCvaForm } from '../../../shared/classes/base-cva-form.class';

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
    const employeeControls = {
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      department: new FormControl('', Validators.required),
      specialization: new FormControl('', Validators.required),
    };
    super(ngControl, employeeControls, cdr);
    this.ngControl.valueAccessor = this;
    this.sharedFacade.getAllShared();
  }
}
