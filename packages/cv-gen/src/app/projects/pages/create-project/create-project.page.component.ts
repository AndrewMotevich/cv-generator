import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { markAllAsDirty } from '../../../shared/utils/mark-as-dirty.util';
import { ProjectsFacade } from '../../../ngrx/projects/projects.facade';

@Component({
  selector: 'cv-gen-create-project.page',
  templateUrl: './create-project.page.component.html',
  styleUrls: ['./create-project.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProjectPageComponent {
  public projectForm = this.formBuilder.group({
    cvaForm: [{}],
  });

  constructor(
    private formBuilder: FormBuilder,
    private projectsFacade: ProjectsFacade
  ) {}

  public submitProjectForm() {
    if (this.projectForm.invalid) {
      markAllAsDirty(this.projectForm.controls);
      this.projectForm.controls.cvaForm.markAsTouched();
      return;
    }
    this.projectsFacade.addProject(
      this.projectForm.controls.cvaForm.getRawValue()
    );
  }
}
