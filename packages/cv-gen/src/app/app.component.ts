import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { environment } from '../environments/environment.development';
import { AuthFacade } from './ngrx/auth/auth.facade';
import { ThemeService } from './theme.service';

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
    private authFacade: AuthFacade
  ) {}

  ngOnInit() {
    this.translateService.use(environment.DEFAULT_LOCALE);
    this.primengConfig.ripple = true;
    this.authFacade.initialRefreshToken();
  }
}
