import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { markAsDirty } from '../../../shared/utils/mark-as-dirty.util';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cv-gen-auth.page',
  templateUrl: './auth.page.component.html',
  styleUrls: ['./auth.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageComponent {
  errorMessages = {
    required: '',
    email: '',
  };

  cities = ['New York', 'Rome', 'London', 'Istanbul', 'Paris'];

  authForm = new FormGroup({
    textInput: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    selectInput: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  constructor(private translateService: TranslateService) {
    this.translateService
      .get('ERROR_MESSAGES.REQUIRED', { value: 'Field' })
      .subscribe((res) => (this.errorMessages.required = res));
    this.translateService
      .get('ERROR_MESSAGES.EMAIL')
      .subscribe((res) => (this.errorMessages.email = res));
  }

  submit() {
    if (this.authForm.invalid) {
      markAsDirty(this.authForm.controls);
      return;
    }
    console.log(this.authForm.getRawValue());
  }
}
