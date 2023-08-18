import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateInputComponent } from './date-input.component';
import { GetErrorMessagePipe } from '../../get-error-message.pipe';

@NgModule({
  declarations: [DateInputComponent],
  imports: [
    CommonModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    GetErrorMessagePipe,
  ],
  exports: [DateInputComponent],
})
export class DateInputModule {}
