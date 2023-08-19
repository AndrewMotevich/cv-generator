import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberInputComponent } from './number-input.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { GetErrorMessagePipe } from '../../shared/pipes/get-error-message.pipe';
import { ChildTranslateModule } from '../../shared/translate/child-translate.module';

@NgModule({
  declarations: [NumberInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    GetErrorMessagePipe,
    ChildTranslateModule,
  ],
  exports: [NumberInputComponent],
})
export class NumberInputModule {}
