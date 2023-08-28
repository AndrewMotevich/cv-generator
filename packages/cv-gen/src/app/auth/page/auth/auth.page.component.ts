import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthFacade } from '../../../ngrx/auth/auth.facade';
import { markAllAsDirty } from '../../../shared/utils/mark-as-dirty.util';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { EMPLOYEES } from '../../../shared/constants/routing-paths.consts';

@Component({
  selector: 'cv-gen-auth.page',
  templateUrl: './auth.page.component.html',
  styleUrls: ['./auth.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageComponent {
  public authForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  public rememberMe = new FormControl<boolean>(false)

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade,
    private authService: AuthService,
    private router: Router
  ) {}

  public submitAuth() {
    if (this.authForm.invalid) {
      markAllAsDirty(this.authForm.controls);
      return;
    }
    this.authFacade.logIn(this.authForm.getRawValue());
    this.authService.setIsLogin(this.rememberMe.value).next(true);
    this.router.navigate([EMPLOYEES.path]);
  }
}
