import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { markAllAsDirty } from '../../../shared/utils/mark-as-dirty.util';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cv-gen-auth.page',
  templateUrl: './auth.page.component.html',
  styleUrls: ['./auth.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageComponent implements OnInit {
  public errorMessages = {
    required: '',
    email: '',
    minlength: '',
    maxlength: '',
  };

  public specialization = ['Angular', 'React', 'Vue'];

  public authForm = this.fb.group({
    textInput: ['', [Validators.required, Validators.email]],
    passwordInput: ['', [Validators.required, Validators.minLength(8)]],
  });

  public projectsForm = this.fb.group({
    selectInput: ['', { validators: [Validators.required] }],
    dateInput: ['', { validators: Validators.required }],
    chipsInput: ['', { validators: Validators.required }],
    textareaInput: ['', [Validators.required, Validators.maxLength(255)]],
    numberInput: ['', { validators: Validators.required }],
  });

  constructor(
    private translateService: TranslateService,
    private fb: FormBuilder,
  ) {}

  public ngOnInit() {
    this.translateService
      .get('ERROR_MESSAGES.REQUIRED', { value: 'Field' })
      .subscribe((res) => (this.errorMessages.required = res));
    this.translateService
      .get('ERROR_MESSAGES.EMAIL')
      .subscribe((res) => (this.errorMessages.email = res));
    this.translateService
      .get('ERROR_MESSAGES.MIN_LENGTH', { value: 8 })
      .subscribe((res) => (this.errorMessages.minlength = res));
    this.translateService
      .get('ERROR_MESSAGES.MAX_LENGTH', { value: 255 })
      .subscribe((res) => (this.errorMessages.maxlength = res));
  }

  public submitAuth() {
    if (this.authForm.invalid) {
      markAllAsDirty(this.authForm.controls);
      return;
    }
    console.log(this.authForm.getRawValue());
  }

  public submitProjects() {
    if (this.projectsForm.invalid) {
      markAllAsDirty(this.projectsForm.controls);
      return;
    }
    console.log(this.authForm.getRawValue());
  }

  public switchLanguage(lang: string){
    this.translateService.use(lang)
  }
}
