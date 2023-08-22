import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Optional,
  Self,
  OnInit,
} from '@angular/core';
import {
  ChipsInputModule,
  DateInputModule,
  NumberInputModule,
  PasswordInputModule,
  SelectInputModule,
  TextInputModule,
  TextareaModule,
} from '@cva/my-cva-lib';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { markAllAsDirty } from '../../utils/mark-as-dirty.util';
import { TranslateModule } from '@ngx-translate/core';
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
export class ProjectFormComponent extends BaseCvaForm implements ControlValueAccessor, OnInit {
  public specialization = ['Angular', 'React', 'Vue'];

  constructor(
    @Self() @Optional() ngControl: NgControl,
    cdRef: ChangeDetectorRef,
  ) {
    const projectsControls: {[key: string]: FormControl} = {
      selectInput: new FormControl('', { validators: Validators.required }),
      dateInput: new FormControl('', { validators: Validators.required }),
      chipsInput: new FormControl('', { validators: Validators.required }),
      textareaInput: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      numberInput: new FormControl('', { validators: Validators.required }),
    };
    super(ngControl, projectsControls, cdRef)
    this.ngControl.valueAccessor = this;
  }

  public submitProjects() {
    if (this.form.invalid) {
      markAllAsDirty(this.form.controls);
      return;
    }
    console.log(this.form.getRawValue());
  }
}
