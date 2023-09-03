import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectDto } from '../../../projects/models/project.model';
import { ProjectsFacade } from '../../../ngrx/projects/projects.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'cv-gen-projects-accordion',
  templateUrl: './projects-accordion.component.html',
  styleUrls: ['./projects-accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsAccordionComponent implements OnInit {
  @Input() form: FormGroup;

  public projectsOptions$ = this.projectsFacade.projectsNames$;

  public selectedProjectControl = new FormControl<
    Pick<ProjectDto, 'id' | 'projectName'>
  >(null, Validators.required);

  get projects(): FormArray {
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
        formArray.push(
          new FormControl({
            ...project,
            id: null,
          })
        );
      });
  }

  public deleteProjectForm(index: number) {
    const formArray = this.form.get('projects') as FormArray;
    formArray.removeAt(index);
  }
}
