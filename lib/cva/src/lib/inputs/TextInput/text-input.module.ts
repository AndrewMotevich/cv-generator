import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetErrorMessagePipe } from '../../shared/pipes/get-error-message.pipe';
import { ChildTranslateModule } from '../../shared/translate/child-translate.module';

@NgModule({
  declarations: [TextInputComponent],
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    GetErrorMessagePipe,
    ChildTranslateModule
  ],
  exports: [TextInputComponent],
})
export class TextInputModule {}
