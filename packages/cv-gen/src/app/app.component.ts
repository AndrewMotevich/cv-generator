import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { environment } from '../environments/environment.development';
import { ThemeService } from './theme.service';
import { AuthService } from './shared/services/auth.service';

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
    private translateService: TranslateService,
    private themeService: ThemeService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.translateService.use(environment.DEFAULT_LOCALE);
    this.primengConfig.ripple = true;
    this.authService.initialRefresh()
  }
}
