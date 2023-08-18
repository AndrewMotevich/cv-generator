import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberInputComponent } from './number-input.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { GetErrorMessagePipe } from '../../get-error-message.pipe';

@NgModule({
  declarations: [NumberInputComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputNumberModule, GetErrorMessagePipe],
  exports: [NumberInputComponent],
})
export class NumberInputModule {}
