import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../../theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'cv-gen-mobile-sidebars',
  templateUrl: './mobile-sidebars.component.html',
  styleUrls: ['./mobile-sidebars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSidebarsComponent implements OnInit {
  @Input() public isSettingsSidebarVisible = false;
  @Input() public isNavigationSidebarVisible = false;

  public isDarkTheme: Observable<boolean>;

  constructor(
    private translateService: TranslateService,
    private themeService: ThemeService
  ) {}

  public ngOnInit(): void {
    this.isDarkTheme = this.themeService.getIsDarkTheme();
  }

  public switchLanguage(lang: string): void {
    this.translateService.use(lang);
  }

  public switchTheme(): void {
    this.themeService.switchTheme();
  }
}
