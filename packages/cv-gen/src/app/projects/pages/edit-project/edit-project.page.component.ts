import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProjectsFacade } from '../../../ngrx/projects/projects.facade';

@UntilDestroy()
@Component({
  selector: 'cv-gen-edit-project.page',
  templateUrl: './edit-project.page.component.html',
  styleUrls: ['./edit-project.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProjectPageComponent implements OnInit {
  public cvaProjectForm = new FormControl(null);

  private id: number;

  constructor(
    private formBuilder: FormBuilder,
    private projectsFacade: ProjectsFacade,
    private route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectsFacade.getProjectById(this.id);
    this.projectsFacade.selectedProject$
      .pipe(untilDestroyed(this))
      .subscribe((project) => {
        console.log(project);
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
}
