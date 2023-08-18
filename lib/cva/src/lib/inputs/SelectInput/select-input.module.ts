import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectInputComponent } from './select-input.component';

@NgModule({
  declarations: [SelectInputComponent],
  imports: [CommonModule, DropdownModule, FormsModule, ReactiveFormsModule],
  exports: [SelectInputComponent],
})
export class SelectInputModule {}
