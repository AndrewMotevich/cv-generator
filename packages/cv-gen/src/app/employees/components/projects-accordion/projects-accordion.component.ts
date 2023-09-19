import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProjectsFacade } from '../../../ngrx/projects/projects.facade';
import { ProjectDto } from '../../../projects/models/project.model';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'cv-gen-projects-accordion',
  templateUrl: './projects-accordion.component.html',
  styleUrls: ['./projects-accordion.component.scss'],
})
export class ProjectsAccordionComponent implements OnInit {
  @Input() form: FormGroup;

  public projectsOptions$ = this.projectsFacade.projectsNames$;

  public selectedProjectControl = new FormControl<
    Pick<ProjectDto, 'id' | 'projectName'>
  >(null, Validators.required);

  get projectsFormArray(): FormArray {
    return this.form.get('projects') as FormArray;
  }

  constructor(private projectsFacade: ProjectsFacade) {}

  public ngOnInit() {
    this.projectsFacade.loadProjects();
  }

  public addProjectForm() {
    if (this.selectedProjectControl.invalid) {
      this.selectedProjectControl.markAsDirty();
      return;
    }
    this.projectsFacade
      .getProjectById(this.selectedProjectControl.value.id)
      .pipe(untilDestroyed(this))
      .subscribe((project) => {
        const formArray = this.form.get('projects') as FormArray;
        delete project.id;
        formArray.push(
          new FormControl({
            ...project,
          })
        );
      });
  }

  public deleteProjectForm(index: number) {
    const formArray = this.form.get('projects') as FormArray;
    formArray.removeAt(index);
  }
}
