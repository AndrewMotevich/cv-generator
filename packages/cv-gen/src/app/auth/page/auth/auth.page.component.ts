import { ChangeDetectionStrategy, Component } from '@angular/core';
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
export class AuthPageComponent {
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
