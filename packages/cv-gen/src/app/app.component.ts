import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { EmployeesFacade } from './ngrx/employees/employees.facade';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment.development';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'cv-gen-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private primengConfig: PrimeNGConfig,
    private employeesFacade: EmployeesFacade,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.translateService.use(environment.DEFAULT_LOCALE);
    this.primengConfig.ripple = true;
    this.employeesFacade.init();
  }
}
