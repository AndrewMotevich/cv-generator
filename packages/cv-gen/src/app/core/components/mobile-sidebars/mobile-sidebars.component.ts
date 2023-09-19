import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { CoreFacade } from '../../../ngrx/core/core.facade';
import { Language } from '../../../shared/enums/language.enum';
import { Theme } from '../../../shared/enums/theme.enum';

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

  public theme: Theme;
  public language = Language;

  constructor(
    private translateService: TranslateService,
    private coreFacade: CoreFacade,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.coreFacade.theme$.pipe(untilDestroyed(this)).subscribe((theme) => {
      this.theme = theme;
    });
    this.isNavigationObservable.subscribe((value) => {
      this.isNavigationVisible = value;
      this.cdr.markForCheck();
    });
    this.isSettingsObservable.subscribe((value) => {
      this.isSettingsVisible = value;
      this.cdr.markForCheck();
    });
  }

  public switchLanguage(language: Language): void {
    this.translateService.use(language);
    this.coreFacade.setLanguage(language);
  }

  public switchTheme(): void {
    if (this.theme === Theme.dark) {
      this.coreFacade.setTheme(Theme.light);
    } else {
      this.coreFacade.setTheme(Theme.dark);
    }
  }
}
