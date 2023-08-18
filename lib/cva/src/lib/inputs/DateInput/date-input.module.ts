import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateInputComponent } from './date-input.component';

@NgModule({
  declarations: [DateInputComponent],
  imports: [CommonModule, CalendarModule, FormsModule, ReactiveFormsModule],
  exports: [DateInputComponent],
})
export class DateInputModule {}
