import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormGroup,
  NgControl,
  Validators,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProjectsFacade } from '../../../ngrx/projects/projects.facade';
import { SharedFacade } from '../../../ngrx/shared/shared.facade';
import { ProjectDto } from '../../../projects/models/project.model';
import { BaseCvaForm } from '../../../shared/classes/base-cva-form.class';

@UntilDestroy()
@Component({
  selector: 'cv-gen-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvFormComponent
  extends BaseCvaForm
  implements ControlValueAccessor, OnInit
{
  public departments$ = this.sharedFacade.departments$;
  public specializations$ = this.sharedFacade.specializations$;
  public skills$ = this.sharedFacade.skills$;
  public projectsOptions$ = this.projectsFacade.projectsOptions$;

  public selectedProjectControl = new FormControl<
    Pick<ProjectDto, 'id' | 'projectName'>
  >(null, Validators.required);

  get projects(): FormArray {
    return this.form.get('projects') as FormArray;
  }

  constructor(
    private projectsFacade: ProjectsFacade,
    private sharedFacade: SharedFacade,
    public override ngControl: NgControl,
    private cdr: ChangeDetectorRef
  ) {
    const cvControls = {
      cvName: new FormControl('', Validators.required),
      language: new FormControl([], Validators.required),
      skills: new FormControl([], Validators.required),

      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      department: new FormControl('', Validators.required),
      specialization: new FormControl('', Validators.required),

      employeeId: new FormControl<number>(null, Validators.required),
      projects: new FormArray([]),
    };
    super(ngControl, cvControls, cdr);
    this.ngControl.valueAccessor = this;
    this.sharedFacade.getAllShared();
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
          new FormGroup({
            project: new FormControl(project),
          })
        );
      });
  }

  public deleteProjectForm(index: number) {
    const formArray = this.form.get('projects') as FormArray;
    formArray.removeAt(index);
  }
}
