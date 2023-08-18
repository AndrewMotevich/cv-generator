import { Pipe, PipeTransform } from '@angular/core';
import {  ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'getErrorMessage',
  standalone: true,
})
export class GetErrorMessagePipe implements PipeTransform {
  transform(errors: ValidationErrors, errorMessages: {[key: string]: string}): string {
    const errorKey = Object.keys(errors)[0];
    return errorMessages[errorKey]
  }
}
