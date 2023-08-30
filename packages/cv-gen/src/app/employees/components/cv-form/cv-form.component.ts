import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'cv-gen-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvFormComponent {
  mainForm: FormGroup;

  get customForms(): FormArray {
    return this.mainForm.get('customForms') as FormArray;
  }

  constructor(private formBuilder: FormBuilder) {
    this.mainForm = this.formBuilder.group({
      customForms: this.formBuilder.array([]),
    });
  }

  addCustomForm() {
    const formArray = this.mainForm.get('customForms') as FormArray;
    formArray.push(this.createCustomForm());
  }

  createCustomForm() {
    return this.formBuilder.group({
      customForm: null,
    });
  }

  submitProjectForm(){
    if(this.mainForm.invalid){
      return
    }
    console.log(this.mainForm.getRawValue())
  }
}
