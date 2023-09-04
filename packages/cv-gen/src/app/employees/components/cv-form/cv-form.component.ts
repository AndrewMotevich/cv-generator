import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormControl,
  NgControl,
  Validators,
} from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { EmployeesFacade } from '../../../ngrx/employees/employees.facade';
import { SharedFacade } from '../../../ngrx/shared/shared.facade';
import { BaseCvaForm } from '../../../shared/classes/base-cva-form.class';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'cv-gen-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvFormComponent
  extends BaseCvaForm
  implements ControlValueAccessor, OnInit, AfterViewInit
{
  @Input() employeeId: number;

  public departments$ = this.sharedFacade.departments$;
  public specializations$ = this.sharedFacade.specializations$;
  public skills$ = this.sharedFacade.skills$;

  constructor(
    private sharedFacade: SharedFacade,
    private employeesFacade: EmployeesFacade,
    public override ngControl: NgControl,
    private cdr: ChangeDetectorRef
  ) {
    const cvControls = {
      cvName: new FormControl('CV', Validators.required),
      language: new FormArray([]),
      skills: new FormControl([], Validators.required),

      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      department: new FormControl('', Validators.required),
      specialization: new FormControl('', Validators.required),

      employeeId: new FormControl<number>(null, Validators.required),
      projects: new FormArray([]),
    };
    super(ngControl, cvControls, cdr);
    this.ngControl.valueAccessor = this;
    this.sharedFacade.getAllShared();
  }

  public ngAfterViewInit() {
    this.form.controls['employeeId'].setValue(this.employeeId);
  }
}
