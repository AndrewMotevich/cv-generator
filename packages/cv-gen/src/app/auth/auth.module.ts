import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AuthPageComponent } from './page/auth/auth.page.component';

@NgModule({
  declarations: [AuthPageComponent, AuthFormComponent],
  imports: [CommonModule],
})
export class AuthModule {}
