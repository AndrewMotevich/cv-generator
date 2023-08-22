import { AbstractControl, FormControl} from "@angular/forms";

export function markAllAsDirty(controls: {[key: string]: FormControl | AbstractControl}){
  Object.values(controls).forEach((control) => {
    control.markAsDirty();
    if (control.invalid) {
      control.updateValueAndValidity({ onlySelf: true });
    }
  });
}
