import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { map } from 'rxjs';
import { SharedFacade } from '../../../ngrx/shared/shared.facade';
import { LangLevel } from '../../../shared/enums/language.enum';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'cv-gen-language-accordion',
  templateUrl: './language-accordion.component.html',
  styleUrls: ['./language-accordion.component.scss'],
})
export class LanguageAccordionComponent {
  @Input() form: FormGroup;

  public languages$ = this.sharedFacade.languages$.pipe(
    map((langs) => langs.map((lang) => lang.name))
  );
  public levels = Object.values(LangLevel);

  get languageFormArray(): FormArray {
    return this.form.get('language') as FormArray;
  }

  constructor(private sharedFacade: SharedFacade) {}

  public addLanguageForm() {
    const formArray = this.form.get('language') as FormArray;

    formArray.push(
      new FormGroup({
        name: new FormControl('Language', Validators.required),
        level: new FormControl('A1', Validators.required),
      })
    );
  }

  public deleteLanguageForm(index: number) {
    const formArray = this.form.get('language') as FormArray;
    formArray.removeAt(index);
  }
}
