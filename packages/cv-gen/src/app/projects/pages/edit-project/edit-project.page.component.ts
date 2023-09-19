import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs';
import { CoreFacade } from '../../../ngrx/core/core.facade';
import { ProjectsFacade } from '../../../ngrx/projects/projects.facade';
import {
  BREADCRUMB_PROJECT_EDIT_FACTORY
} from '../../constants/breadcrumbs.const';

@UntilDestroy()
@Component({
  selector: 'cv-gen-edit-project.page',
  templateUrl: './edit-project.page.component.html',
  styleUrls: ['./edit-project.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProjectPageComponent implements OnInit {
  public loaded$ = this.projectsFacade.loaded$
  public cvaProjectForm = new FormControl(null);

  private id: number;

  constructor(
    private projectsFacade: ProjectsFacade,
    private route: ActivatedRoute,
    private coreFacade: CoreFacade
  ) {}

  public ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectsFacade.loadProjectById(this.id);
    this.projectsFacade.selectedProject$
      .pipe(untilDestroyed(this), filter(Boolean))
      .subscribe((project) => {
        this.coreFacade.setBreadcrumbs(BREADCRUMB_PROJECT_EDIT_FACTORY(project));
        this.cvaProjectForm.setValue({
          ...project,
        });
      });
  }

  public submitProjectForm() {
    if (this.cvaProjectForm.invalid) {
      this.cvaProjectForm.markAsTouched();
      return;
    }
    this.projectsFacade.updateProject(
      this.id,
      this.cvaProjectForm.getRawValue()
    );
  }

  public deleteProject() {
    this.projectsFacade.deleteProject(this.id);
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
