import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../theme.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { ABOUT } from '../../../shared/constants/routing-paths.consts';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'cv-gen-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  public isDarkTheme: BehaviorSubject<boolean> = new BehaviorSubject(true);

  public isNavigationSidebarVisible = false;

  public isSettingsSidebarVisible = false;

  public langItems: MenuItem[] = [
    {
      label: 'En',
      command: () => this.switchLanguage('en'),
    },
    {
      label: 'Ru',
      command: () => { this.switchLanguage('ru')},
    },
  ];

  public aboutPath = ABOUT.path

  constructor(
    private translateService: TranslateService,
    private themeService: ThemeService
  ) {}

  public ngOnInit(): void {
    this.isDarkTheme.subscribe((value) => {
      this.themeService.switchTheme(value);
    });
  }

  public switchLanguage(lang: string) {
    this.translateService.use(lang);
  }

  public switchTheme() {
    this.isDarkTheme.next(!this.isDarkTheme.getValue());
  }
}
