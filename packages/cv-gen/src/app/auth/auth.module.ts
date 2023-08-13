import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AuthPageComponent } from './page/auth/auth.page.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [AuthPageComponent, AuthFormComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
