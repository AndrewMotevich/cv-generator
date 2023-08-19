import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextareaInputComponent } from './textarea-input.component';
import { GetErrorMessagePipe } from '../../shared/pipes/get-error-message.pipe';
import { ChildTranslateModule } from '../../shared/translate/child-translate.module';

@NgModule({
  declarations: [TextareaInputComponent],
  imports: [
    CommonModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    GetErrorMessagePipe,
    ChildTranslateModule
  ],
  exports: [TextareaInputComponent],
})
export class TextareaModule {}
