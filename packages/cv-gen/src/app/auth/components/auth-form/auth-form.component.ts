import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { markAllAsDirty } from '../../../shared/utils/mark-as-dirty.util';
import { AuthFacade } from '../../../ngrx/auth/auth.facade';

@Component({
  selector: 'cv-gen-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent implements OnInit {
  public authForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    rememberMe: [false]
  });

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade
  ) {}

  ngOnInit(){
    this.authFacade.token$.subscribe(res => console.log(res))
  }

  public submitAuth() {
    if (this.authForm.invalid) {
      markAllAsDirty(this.authForm.controls);
      return;
    }
    const {email, password} = this.authForm.getRawValue()
    this.authFacade.logIn(email, password)
  }
}
