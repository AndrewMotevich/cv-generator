import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { EmployeesFacade } from './ngrx/employees/employees.facade';

@Component({
  selector: 'cv-gen-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private primengConfig: PrimeNGConfig,
    private employeesFacade: EmployeesFacade
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.employeesFacade.init();
  }
}
