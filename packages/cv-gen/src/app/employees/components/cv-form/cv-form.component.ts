import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
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
import { CV_CONTROLS } from '../../constants/cv-form-controls.const';
import { CvDto } from '../../models/cvs.model';
import { markAllAsDirty } from '../../../shared/utils/mark-as-dirty.util';

@UntilDestroy({ checkProperties: true })
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
    super(ngControl, CV_CONTROLS, cdr);
    this.ngControl.valueAccessor = this;
    this.sharedFacade.getAllShared();
  }

  public override ngOnInit() {
    this.form.valueChanges.subscribe(() => {
      this.onChange(this.form.value);
    });

    this.cvsFacade.selectedCv$.pipe(untilDestroyed(this)).subscribe((cv) => {
      this.setFormVisibility(cv);
      this.form.patchValue(cv);
      this.setProjectAccordion(cv);
      this.setLanguageAccordion(cv);
      this.cdr.detectChanges();
    });
  }

  public setFormVisibility(cv: CvDto) {
    if (!cv) {
      this.showCvForm = false;
      return;
    } else {
      this.showCvForm = true;
    }
    this.cdr.markForCheck();
  }

  public setProjectAccordion(cv: CvDto) {
    if (cv) {
      const formProjectsArray = this.form.get('projects') as FormArray;

      formProjectsArray.clear();
      cv.projects.map((project) => {
        formProjectsArray.push(
          new FormControl({
            ...project,
          })
        );
      });

      formProjectsArray.controls.forEach(control => {
        control.markAllAsTouched(),
        control.markAsDirty()
      })
    }
  }

  public setLanguageAccordion(cv: CvDto) {
    if (cv) {
      const formLanguageArray = this.form.controls['language'] as FormArray;

      formLanguageArray.clear();
      cv.language.map((lang) => {
        formLanguageArray.push(
          new FormGroup({
            name: new FormControl(lang.name, Validators.required),
            level: new FormControl(lang.level, Validators.required),
          })
        );
      });

      formLanguageArray.controls.forEach(control => {
        markAllAsDirty((control as FormGroup).controls)
      })
    }
  }
}
