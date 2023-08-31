import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipsInputComponent } from './chips-input.component';
import { GetErrorMessagePipe } from '../../shared/pipes/get-error-message.pipe';
import { ChildTranslateModule } from '../../shared/translate/child-translate.module';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [ChipsInputComponent],
  imports: [
    CommonModule,
    AutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
    GetErrorMessagePipe,
    ChildTranslateModule,
  ],
  exports: [ChipsInputComponent],
})
export class ChipsInputModule {}
