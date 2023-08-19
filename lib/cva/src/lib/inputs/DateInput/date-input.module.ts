import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateInputComponent } from './date-input.component';
import { GetErrorMessagePipe } from '../../shared/pipes/get-error-message.pipe';
import { ChildTranslateModule } from '../../shared/translate/child-translate.module';

@NgModule({
  declarations: [DateInputComponent],
  imports: [
    CommonModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    GetErrorMessagePipe,
    ChildTranslateModule,
  ],
  exports: [DateInputComponent],
})
export class DateInputModule {}
