import { Pipe, PipeTransform } from '@angular/core';
import {  ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'getErrorMessage',
  standalone: true,
})
export class GetErrorMessagePipe implements PipeTransform {

  errorMessages: {[key: string]: string} = {
    required: 'ERROR_MESSAGES.REQUIRED',
    email: 'ERROR_MESSAGES.REQUIRED',
    minlength: 'ERROR_MESSAGES.MIN_LENGTH',
    maxlength: 'ERROR_MESSAGES.MAX_LENGTH',
  }


  transform(errors: ValidationErrors): string {
    const errorKey = Object.keys(errors)[0];
    return this.errorMessages[errorKey] || 'Validation Error'
  }
}
