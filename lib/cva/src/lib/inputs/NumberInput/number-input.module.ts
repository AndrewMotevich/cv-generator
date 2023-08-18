import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberInputComponent } from './number-input.component';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [NumberInputComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputNumberModule],
  exports: [NumberInputComponent],
})
export class NumberInputModule {}
