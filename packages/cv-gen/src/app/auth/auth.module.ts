import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AuthPageComponent } from './page/auth/auth.page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { TextInputModule } from '@cva/my-cva-lib';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [AuthPageComponent, AuthFormComponent],
  imports: [
    ButtonModule,
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TextInputModule,
  ],
})
export class AuthModule {}
