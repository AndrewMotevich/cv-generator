import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { markAsDirty } from '../../../shared/utils/mark-as-dirty.util';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cv-gen-auth.page',
  templateUrl: './auth.page.component.html',
  styleUrls: ['./auth.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageComponent implements OnInit {
  errorMessages = {
    required: '',
    email: '',
    minLength: '',
    maxLength: '',
  };

  specialization = ['Angular', 'React', 'Vue'];

  authForm = new FormGroup({
    textInput: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    selectInput: new FormControl('', {
      validators: [Validators.required],
    }),
    dateInput: new FormControl('', { validators: Validators.required }),
    chipsInput: new FormControl('', { validators: Validators.required }),
  });

  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.translateService
      .get('ERROR_MESSAGES.REQUIRED', { value: 'Field' })
      .subscribe((res) => (this.errorMessages.required = res));
    this.translateService
      .get('ERROR_MESSAGES.EMAIL')
      .subscribe((res) => (this.errorMessages.email = res));
    this.translateService
      .get('ERROR_MESSAGES.MIN_LENGTH', { value: 8 })
      .subscribe((res) => (this.errorMessages.maxLength = res));
    this.translateService
      .get('ERROR_MESSAGES.MAX_LENGTH', { value: 255 })
      .subscribe((res) => (this.errorMessages.maxLength = res));
  }

  submit() {
    if (this.authForm.invalid) {
      markAsDirty(this.authForm.controls);
      return;
    }
    console.log(this.authForm.getRawValue());
  }
}
