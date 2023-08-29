import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { selectTheme } from './ngrx/core/core.selectors';
import { Theme } from './shared/enums/theme.enum';

@UntilDestroy({ checkProperties: true })
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme = this.store.select(selectTheme);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private store: Store
  ) {
    this.theme.pipe(untilDestroyed(this)).subscribe((theme) => {
      const themeLink = this.document.getElementById(
        'app-theme'
      ) as HTMLLinkElement;

      if (themeLink) {
        if (theme === Theme.dark) {
          themeLink.href = 'soho-dark.css';
        } else {
          themeLink.href = 'soho-light.css';
        }
      }
    });
  }
}
