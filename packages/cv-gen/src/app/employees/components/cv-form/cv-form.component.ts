import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormGroup,
  NgControl,
  Validators,
} from '@angular/forms';
import { SharedFacade } from '../../../ngrx/shared/shared.facade';
import { BaseCvaForm } from '../../../shared/classes/base-cva-form.class';

@Component({
  selector: 'cv-gen-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvFormComponent
  extends BaseCvaForm
  implements ControlValueAccessor, OnInit
{
  public departments$ = this.sharedFacade.departments$;
  public specializations$ = this.sharedFacade.specializations$;

  get projects(): FormArray {
    return this.form.get('projects') as FormArray;
  }

  constructor(
    private sharedFacade: SharedFacade,
    public override ngControl: NgControl,
    private cdr: ChangeDetectorRef
  ) {
    const cvControls = {
      cvName: new FormControl('', Validators.required),
      language: new FormControl([], Validators.required),
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

  public addProjectForm() {
    const formArray = this.form.get('projects') as FormArray;
    formArray.push(new FormGroup({ project: new FormControl(null) }));
  }

  public deleteProjectForm(index: number) {
    const formArray = this.form.get('projects') as FormArray;
    formArray.removeAt(index);
  }
}
