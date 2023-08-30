import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { markAllAsDirty } from '../../../shared/utils/mark-as-dirty.util';

@Component({
  selector: 'cv-gen-create-project.page',
  templateUrl: './create-project.page.component.html',
  styleUrls: ['./create-project.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProjectPageComponent {
  public projectForm = this.formBuilder.group({
    cvaForm: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder) {}

  public submitProjectForm() {
    if(this.projectForm.invalid){
      markAllAsDirty(this.projectForm.controls)
      return
    }
    console.log(this.projectForm.getRawValue());
  }

  public clearProjectForm(){
    this.projectForm.controls.cvaForm.patchValue('')
  }
}
