import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextareaInputComponent } from './textarea-input.component';
import { GetErrorMessagePipe } from '../../get-error-message.pipe';

@NgModule({
  declarations: [TextareaInputComponent],
  imports: [
    CommonModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    GetErrorMessagePipe
  ],
  exports: [TextareaInputComponent],
})
export class TextareaModule {}
