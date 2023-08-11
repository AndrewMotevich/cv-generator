import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cv-gen-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'cv-gen';
  inputValue = new FormControl('');
  ngOnInit() {
    this.inputValue.valueChanges.subscribe((res) => console.log(res));
  }
}
