import { FormArray, FormControl, Validators } from '@angular/forms';

export const CV_CONTROLS = {
  id: new FormControl<number>(0),
  cvName: new FormControl('CV', Validators.required),
  language: new FormArray([]),
  skills: new FormControl([], Validators.required),

  firstName: new FormControl('', Validators.required),
  lastName: new FormControl('', Validators.required),
  email: new FormControl('', {
    validators: [Validators.required, Validators.email],
  }),
  department: new FormControl('', Validators.required),
  specialization: new FormControl('', Validators.required),

  employeeId: new FormControl<number>(null, Validators.required),
  projects: new FormArray([]),
};
