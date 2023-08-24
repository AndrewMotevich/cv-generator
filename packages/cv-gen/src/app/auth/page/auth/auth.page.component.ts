import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { ThemeService } from '../../../theme.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cv-gen-auth.page',
  templateUrl: './auth.page.component.html',
  styleUrls: ['./auth.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageComponent implements OnInit {
  public isDarkTheme: BehaviorSubject<boolean> = new BehaviorSubject(true);

  public items: MenuItem[] = [
    {
      label: 'En',
      command: () => this.switchLanguage('en'),
    },
    {
      label: 'Ru',
      command: () => this.switchLanguage('ru'),
    },
  ];


  constructor(
    private translateService: TranslateService,
    private themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.isDarkTheme.subscribe(value => {
      this.themeService.switchTheme(value)
    })
  }

  private switchLanguage(lang: string) {
    this.translateService.use(lang);
  }

  public switchTheme() {
    this.isDarkTheme.next(!this.isDarkTheme.getValue())
  }
}
