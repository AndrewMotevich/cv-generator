import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetErrorMessagePipe } from '../../get-error-message.pipe';

@NgModule({
  declarations: [TextInputComponent],
  imports: [CommonModule, InputTextModule, FormsModule, ReactiveFormsModule, GetErrorMessagePipe],
  exports: [TextInputComponent],
})
export class TextInputModule {}
