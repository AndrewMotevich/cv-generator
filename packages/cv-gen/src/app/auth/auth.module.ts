import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AuthPageComponent } from './page/auth/auth.page.component';
import { AuthRoutingModule } from './auth-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { PasswordInputModule, TextInputModule } from '@cva/my-cva-lib';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@NgModule({
  declarations: [AuthPageComponent, AuthFormComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ButtonModule,
    PasswordInputModule,
    TextInputModule,
    MenuModule
  ],
})
export class AuthModule {}
