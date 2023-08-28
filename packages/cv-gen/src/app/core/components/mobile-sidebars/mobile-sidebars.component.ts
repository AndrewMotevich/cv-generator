import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThemeService } from '../../../theme.service';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'cv-gen-mobile-sidebars',
  templateUrl: './mobile-sidebars.component.html',
  styleUrls: ['./mobile-sidebars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSidebarsComponent implements OnInit {
  @Input() public isSettingsObservable: BehaviorSubject<boolean>;
  @Input() public isNavigationObservable: BehaviorSubject<boolean>;

  public isSettingsVisible = false;
  public isNavigationVisible = false;

  public isDarkTheme: Observable<boolean>;

  constructor(
    private translateService: TranslateService,
    private themeService: ThemeService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.isDarkTheme = this.themeService.getIsDarkTheme();
    this.isNavigationObservable.subscribe((value) => {
      this.isNavigationVisible = value;
      this.cdr.markForCheck();
    });
    this.isSettingsObservable.subscribe((value) => {
      this.isSettingsVisible = value;
      this.cdr.markForCheck();
    });
  }

  public switchLanguage(lang: string): void {
    this.translateService.use(lang);
  }

  public switchTheme(): void {
    this.themeService.switchTheme();
  }
}
