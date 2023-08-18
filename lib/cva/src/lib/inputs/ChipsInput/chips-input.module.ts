import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipsModule } from 'primeng/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipsInputComponent } from './chips-input.component';
import { GetErrorMessagePipe } from '../../get-error-message.pipe';

@NgModule({
  declarations: [ChipsInputComponent],
  imports: [
    CommonModule,
    ChipsModule,
    FormsModule,
    ReactiveFormsModule,
    GetErrorMessagePipe,
  ],
  exports: [ChipsInputComponent],
})
export class ChipsInputModule {}
