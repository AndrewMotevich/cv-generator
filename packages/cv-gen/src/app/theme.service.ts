import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';

@UntilDestroy({ checkProperties: true })
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public isDarkTheme: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.isDarkTheme.subscribe((value) => {
      const themeLink = this.document.getElementById(
        'app-theme'
      ) as HTMLLinkElement;
      if (themeLink) {
        if (value) themeLink.href = 'soho-dark.css';
        else themeLink.href = 'soho-light.css';
      }
    });
  }

  public switchTheme() {
    this.isDarkTheme.next(!this.isDarkTheme.getValue());
  }
}
