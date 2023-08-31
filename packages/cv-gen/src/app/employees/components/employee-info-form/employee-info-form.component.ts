import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedFacade } from '../../../ngrx/shared/shared.facade';
import { markAllAsDirty } from '../../../shared/utils/mark-as-dirty.util';

@Component({
  selector: 'cv-gen-info-form',
  templateUrl: './employee-info-form.component.html',
  styleUrls: ['./employee-info-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeInfoFormComponent {
  public employeeForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', { validators: [Validators.required, Validators.email]}],
    department: ['', Validators.required],
    specialization: ['', Validators.required],
  })

  public departments$ = this.sharedFacade.departments$
  public specializations$ = this.sharedFacade.specializations$

  constructor(private formBuilder: FormBuilder, private sharedFacade: SharedFacade){}

  public submitEmployeeForm() {
    if (this.employeeForm.invalid) {
      markAllAsDirty(this.employeeForm.controls)
      return;
    }
    console.log(this.employeeForm.getRawValue())
  }

  public clearEmployeeForm() {
    this.employeeForm.reset()
  }
}
