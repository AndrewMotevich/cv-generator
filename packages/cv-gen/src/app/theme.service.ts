import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CoreFacade } from './ngrx/core/core.facade';
import { Theme } from './shared/enums/theme.enum';

@UntilDestroy({ checkProperties: true })
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme = this.coreFacade.theme$;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private coreFacade: CoreFacade
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
