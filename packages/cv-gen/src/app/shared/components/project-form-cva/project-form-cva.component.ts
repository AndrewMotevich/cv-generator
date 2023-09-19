import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ChipsInputModule,
  DateInputModule,
  NumberInputModule,
  PasswordInputModule,
  SelectInputModule,
  TextInputModule,
  TextareaModule,
} from '@cva/my-cva-lib';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SharedFacade } from '../../../ngrx/shared/shared.facade';
import { BaseCvaForm } from '../../classes/base-cva-form.class';

@Component({
  selector: 'cv-gen-project-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TranslateModule,
    ChipsInputModule,
    DateInputModule,
    NumberInputModule,
    PasswordInputModule,
    SelectInputModule,
    TextInputModule,
    TextareaModule,
  ],
  templateUrl: './project-form-cva.component.html',
  styleUrls: ['./project-form-cva.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFormComponent
  extends BaseCvaForm
  implements ControlValueAccessor, OnInit
{
  public projectName = 'Project'
  public techStack$ = this.sharedFacade.skills$
  public responsibilities$ = this.sharedFacade.responsibilities$
  public teamRoles$ = this.sharedFacade.teamRoles$

  constructor(
    @Self() @Optional() ngControl: NgControl,
    cdRef: ChangeDetectorRef,
    private sharedFacade: SharedFacade
  ) {
    const projectsControls: { [key: string]: FormControl } = {
      projectName: new FormControl('', { validators: Validators.required }),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      startDate: new FormControl<Date>(null, {
        validators: Validators.required,
      }),
      endDate: new FormControl<Date>(null, { validators: Validators.required }),
      teamSize: new FormControl('', { validators: Validators.required }),
      techStack: new FormControl('', { validators: Validators.required }),
      responsibilities: new FormControl('', {
        validators: Validators.required,
      }),
      teamRoles: new FormControl('', { validators: Validators.required }),
    };
    super(ngControl, projectsControls, cdRef);
    this.ngControl.valueAccessor = this;
    this.sharedFacade.getAllShared();
  }
}
