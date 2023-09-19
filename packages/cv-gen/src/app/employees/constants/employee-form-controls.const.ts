import { FormControl, Validators } from '@angular/forms';

export const EMPLOYEE_CONTROLS = {
  firstName: new FormControl('', Validators.required),
  lastName: new FormControl('', Validators.required),
  email: new FormControl('', {
    validators: [Validators.required, Validators.email],
  }),
  department: new FormControl('', Validators.required),
  specialization: new FormControl('', Validators.required),
};
