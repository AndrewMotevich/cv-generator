import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ButtonModule } from 'primeng/button';
import { CoreFacade } from '../../../ngrx/core/core.facade';
import { Theme } from '../../enums/theme.enum';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'cv-gen-theme-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './theme-button.component.html',
  styleUrls: ['./theme-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeButtonComponent implements OnInit {
  public theme: Theme;

  constructor(private coreFacade: CoreFacade) {}

  public ngOnInit(): void {
    this.coreFacade.theme$.pipe(untilDestroyed(this)).subscribe((theme) => {
      this.theme = theme;
    });
  }

  public switchTheme(): void {
    if (this.theme === Theme.dark) {
      this.coreFacade.setTheme(Theme.light);
    } else {
      this.coreFacade.setTheme(Theme.dark);
    }
  }
}
