import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../../theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'cv-gen-mobile-sidebars',
  templateUrl: './mobile-sidebars.component.html',
  styleUrls: ['./mobile-sidebars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSidebarsComponent {
  @Input() public isSettingsSidebarVisible = false;
  @Input() public isNavigationSidebarVisible = false;

  public isDarkTheme: Observable<boolean> = this.themeService.isDarkTheme

  constructor(
    private translateService: TranslateService,
    private themeService: ThemeService
  ) {}

  public switchLanguage(lang: string) {
    this.translateService.use(lang);
  }

  public switchTheme(){
    this.themeService.switchTheme()
  }
}
