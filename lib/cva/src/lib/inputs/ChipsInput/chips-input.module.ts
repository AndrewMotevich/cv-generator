import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipsModule } from 'primeng/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipsInputComponent } from './chips-input.component';

@NgModule({
  declarations: [ChipsInputComponent],
  imports: [CommonModule, ChipsModule, FormsModule, ReactiveFormsModule],
  exports: [ChipsInputComponent],
})
export class ChipsInputModule {}
