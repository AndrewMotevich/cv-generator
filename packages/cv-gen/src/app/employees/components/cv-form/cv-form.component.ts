import {
  AfterViewInit,
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
import { CvsFacade } from '../../../ngrx/cvs/cvs.facade';
import { SharedFacade } from '../../../ngrx/shared/shared.facade';
import { BaseCvaForm } from '../../../shared/classes/base-cva-form.class';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'cv-gen-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvFormComponent
  extends BaseCvaForm
  implements ControlValueAccessor, OnInit, AfterViewInit
{
  public showCvForm = false;

  public departments$ = this.sharedFacade.departments$;
  public specializations$ = this.sharedFacade.specializations$;
  public skills$ = this.sharedFacade.skills$;

  constructor(
    private cvsFacade: CvsFacade,
    private sharedFacade: SharedFacade,
    public override ngControl: NgControl,
    private cdr: ChangeDetectorRef
  ) {
    const cvControls = {
      cvName: new FormControl('CV', Validators.required),
      language: new FormArray([]),
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
  }

  public ngAfterViewInit() {
    this.cvsFacade.selectedCvs$.pipe(untilDestroyed(this)).subscribe((cv) => {
      if (!cv) {
        this.showCvForm = false;
        this.cdr.markForCheck()
        return
      } else {
        this.showCvForm = true;
      }
      this.form.patchValue(cv);

      const formLanguageArray = this.form.controls['language'] as FormArray;
      const formProjectsArray = this.form.controls['projects'] as FormArray;

      formLanguageArray.clear();
      formProjectsArray.clear();

      cv.language.map((lang) => {
        formLanguageArray.push(
          new FormGroup({
            name: new FormControl(lang.name, Validators.required),
            level: new FormControl(lang.level, Validators.required),
          })
        );
      });
      cv.projects.map((project) => {
        formProjectsArray.push(
          new FormControl({
            ...project,
          })
        );
      });

      this.cdr.detectChanges();
    });
  }
}
