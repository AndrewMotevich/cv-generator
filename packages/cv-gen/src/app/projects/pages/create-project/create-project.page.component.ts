import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ProjectsFacade } from '../../../ngrx/projects/projects.facade';

@Component({
  selector: 'cv-gen-create-project.page',
  templateUrl: './create-project.page.component.html',
  styleUrls: ['./create-project.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProjectPageComponent {
  // make control
  public cvaProjectForm = new FormControl(null)

  constructor(
    private formBuilder: FormBuilder,
    private projectsFacade: ProjectsFacade
  ) {}

  public submitProjectForm() {
    if (this.cvaProjectForm.invalid) {
      this.cvaProjectForm.markAsTouched();
      return;
    }
    this.projectsFacade.addProject(
      this.cvaProjectForm.getRawValue()
    );
  }
}
