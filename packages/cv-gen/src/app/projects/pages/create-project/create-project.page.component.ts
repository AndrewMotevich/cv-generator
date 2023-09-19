import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CoreFacade } from '../../../ngrx/core/core.facade';
import { ProjectsFacade } from '../../../ngrx/projects/projects.facade';
import { BREADCRUMB_PROJECT_CREATE } from '../../constants/breadcrumbs.const';

@Component({
  selector: 'cv-gen-create-project.page',
  templateUrl: './create-project.page.component.html',
  styleUrls: ['./create-project.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProjectPageComponent implements OnInit {
  public loaded$ = this.projectsFacade.loaded$
  public cvaProjectForm = new FormControl(null);

  constructor(
    private projectsFacade: ProjectsFacade,
    private coreFacade: CoreFacade
  ) {}
  public ngOnInit(): void {
    this.coreFacade.setBreadcrumbs(BREADCRUMB_PROJECT_CREATE);
  }

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
