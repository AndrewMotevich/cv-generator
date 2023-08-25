import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthPageComponent } from './page/auth/auth.page.component';

import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxInputModule, PasswordInputModule, TextInputModule } from '@cva/my-cva-lib';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { LanguageButtonComponent } from '../shared/components/language-button/language-button.component';
import { ThemeButtonComponent } from '../shared/components/theme-button/theme-button.component';

@NgModule({
  declarations: [AuthPageComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    ButtonModule,
    PasswordInputModule,
    TextInputModule,
    MenuModule,
    CheckboxInputModule,
    LanguageButtonComponent,
    ThemeButtonComponent
  ],
})
export class AuthModule {}
