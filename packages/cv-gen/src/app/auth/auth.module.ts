import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AuthPageComponent } from './page/auth/auth.page.component';
import { AuthRoutingModule } from './auth-routing.module';
import {
  ChipsInputModule,
  DateInputModule,
  NumberInputModule,
  PasswordInputModule,
  SelectInputModule,
  TextInputModule,
  TextareaModule,
} from '@cva/my-cva-lib';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AuthPageComponent, AuthFormComponent],
  imports: [
    TranslateModule,
    ButtonModule,
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TextInputModule,
    SelectInputModule,
    DateInputModule,
    ChipsInputModule,
    TextareaModule,
    NumberInputModule,
    PasswordInputModule,
  ],
})
export class AuthModule {}
