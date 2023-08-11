import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './TextInput/text-input.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TextInputComponent],
  imports: [CommonModule, InputTextModule, FormsModule, ReactiveFormsModule],
  exports: [TextInputComponent],
})
export class LibCvaModule {}
