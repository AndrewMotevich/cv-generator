import { Component, OnInit, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'cv-gen-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent implements ControlValueAccessor, OnInit {
  control = new FormControl('');

  ngOnInit(): void {
    this.control.valueChanges.subscribe((res) => this.onChange(res || ''));
  }
  onChange: (val: string) => void;
  onTouch: (val: string) => void;
  writeValue(value: string) {
    this.control.setValue(value, { emitEvent: false });
  }
  registerOnChange(fn: (val: string) => void) {
    console.log('onChange', fn);
    this.onChange = fn;
  }
  registerOnTouched(fn: (val: string) => void) {
    this.onTouch = fn;
  }
}
