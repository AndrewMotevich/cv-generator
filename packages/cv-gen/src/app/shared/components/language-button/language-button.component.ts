import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'cv-gen-language-button',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    MenuModule,
    TranslateModule
  ],
  templateUrl: './language-button.component.html',
  styleUrls: ['./language-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageButtonComponent {
  public readonly items: MenuItem[] = [
    {
      label: 'En',
      command: () => this.switchLanguage('en'),
    },
    {
      label: 'Ru',
      command: () => this.switchLanguage('ru'),
    },
  ];

  constructor(private translateService: TranslateService) {}

  private switchLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
