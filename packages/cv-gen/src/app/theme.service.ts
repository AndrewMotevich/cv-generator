import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document){}

  public switchTheme(isDark: boolean){
    const themeLink = this.document.getElementById('app-theme') as HTMLLinkElement

    if (themeLink){
      if(isDark) themeLink.href = 'soho-dark.css'
      else themeLink.href = 'soho-light.css'
    }
  }
}
