import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProjectsFacade } from '../../../ngrx/projects/projects.facade';
import { markAllAsDirty } from '../../../shared/utils/mark-as-dirty.util';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'cv-gen-edit-project.page',
  templateUrl: './edit-project.page.component.html',
  styleUrls: ['./edit-project.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProjectPageComponent implements OnInit {
  public projectForm = this.formBuilder.group({
    cvaForm: [null],
  });

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
        this.projectForm.controls.cvaForm.setValue({
          ...project,
        });
      });
  }

  public submitProjectForm() {
    if (this.projectForm.invalid) {
      markAllAsDirty(this.projectForm.controls);
      this.projectForm.controls.cvaForm.markAsTouched();
      return;
    }
    this.projectsFacade.updateProject(
      this.id,
      this.projectForm.controls.cvaForm.getRawValue()
    );
  }

  public deleteProject() {
    this.projectsFacade.deleteProject(this.id);
  }
}
