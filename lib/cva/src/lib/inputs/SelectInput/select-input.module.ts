import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectInputComponent } from './select-input.component';
import { GetErrorMessagePipe } from '../../shared/pipes/get-error-message.pipe';
import { ChildTranslateModule } from '../../shared/translate/child-translate.module';

@NgModule({
  declarations: [SelectInputComponent],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    GetErrorMessagePipe,
    ChildTranslateModule
  ],
  exports: [SelectInputComponent],
})
export class SelectInputModule {}
