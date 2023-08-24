import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AuthPageComponent } from './page/auth/auth.page.component';
import { AuthRoutingModule } from './auth-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { CheckboxInputModule, PasswordInputModule, TextInputModule } from '@cva/my-cva-lib';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@NgModule({
  declarations: [AuthPageComponent, AuthFormComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    ButtonModule,
    PasswordInputModule,
    TextInputModule,
    MenuModule,
    CheckboxInputModule
  ],
})
export class AuthModule {}
