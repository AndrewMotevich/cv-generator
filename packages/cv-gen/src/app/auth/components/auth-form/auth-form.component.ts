import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { markAllAsDirty } from '../../../shared/utils/mark-as-dirty.util';

@Component({
  selector: 'cv-gen-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent {
  public authForm = this.fb.group({
    textInput: ['', [Validators.required, Validators.email]],
    passwordInput: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private fb: FormBuilder,
  ) {}

  public submitAuth() {
    if (this.authForm.invalid) {
      markAllAsDirty(this.authForm.controls);
      return;
    }
    console.log(this.authForm.getRawValue());
  }
}
