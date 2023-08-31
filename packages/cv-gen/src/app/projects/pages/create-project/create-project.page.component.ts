import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProjectsFacade } from '../../../ngrx/projects/projects.facade';

@Component({
  selector: 'cv-gen-create-project.page',
  templateUrl: './create-project.page.component.html',
  styleUrls: ['./create-project.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProjectPageComponent {
  public cvaProjectForm = new FormControl(null);

  constructor(
    private projectsFacade: ProjectsFacade
  ) {}

  public submitProjectForm() {
    if (this.cvaProjectForm.invalid) {
      this.cvaProjectForm.markAsTouched();
      return;
    }
    this.projectsFacade.addProject(this.cvaProjectForm.getRawValue());
  }

  public clearProjectForm() {
    this.cvaProjectForm.setValue({
      projectName: null,
      startDate: null,
      endDate: null,
      teamSize: null,
      techStack: [],
      description: null,
      responsibilities: [],
      teamRoles: [],
    });
  }
}
