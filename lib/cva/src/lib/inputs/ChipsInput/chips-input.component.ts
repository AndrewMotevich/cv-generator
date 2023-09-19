import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Optional,
  Self,
  ViewChild,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { BaseInputClass } from '../../shared/classes/base-input.class';

@Component({
  selector: 'cv-gen-chips-input',
  templateUrl: './chips-input.component.html',
  styleUrls: ['./chips-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsInputComponent extends BaseInputClass implements OnInit {
  @ViewChild(AutoComplete) autoComplete: AutoComplete;

  @Input() public label: string;
  @Input() public placeholder: string;
  @Input() public suggestions: { name: string }[] = [];

  filteredSuggestions: unknown[] | undefined;

  constructor(
    @Self() @Optional() ngControl: NgControl,
    cdRef: ChangeDetectorRef
  ) {
    super(ngControl, cdRef);
    this.ngControl.valueAccessor = this;
    this.control.setValue([]);
  }

  onKeyEnter() {
    this.control.setValue([
      ...this.control.value,
      this.autoComplete.inputValue,
    ]);
    this.autoComplete.el.nativeElement.querySelector('input').value = '';
  }

  filterSuggestions(event: AutoCompleteCompleteEvent) {
    const filtered: string[] = [];
    const query = event.query;

    for (let i = 0; i < this.suggestions.length; i++) {
      const suggestion = this.suggestions[i];
      if (suggestion.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(suggestion.name);
      }
    }

    this.filteredSuggestions = filtered;
  }
}
