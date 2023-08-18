import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { PasswordInputComponent } from './password-input.component';
import { GetErrorMessagePipe } from '../../get-error-message.pipe';

@NgModule({
  declarations: [PasswordInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    PasswordModule,
    GetErrorMessagePipe,
  ],
  exports: [PasswordInputComponent],
})
export class PasswordInputModule {}
