import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipsModule } from 'primeng/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipsInputComponent } from './chips-input.component';
import { GetErrorMessagePipe } from '../../shared/pipes/get-error-message.pipe';
import { ChildTranslateModule } from '../../shared/translate/child-translate.module';

@NgModule({
  declarations: [ChipsInputComponent],
  imports: [
    CommonModule,
    ChipsModule,
    FormsModule,
    ReactiveFormsModule,
    GetErrorMessagePipe,
    ChildTranslateModule,
  ],
  exports: [ChipsInputComponent],
})
export class ChipsInputModule {}
