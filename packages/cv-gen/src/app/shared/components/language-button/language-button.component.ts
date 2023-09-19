import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { CoreFacade } from '../../../ngrx/core/core.facade';
import { Language } from '../../enums/language.enum';

@Component({
  selector: 'cv-gen-language-button',
  standalone: true,
  imports: [CommonModule, ButtonModule, MenuModule, TranslateModule],
  templateUrl: './language-button.component.html',
  styleUrls: ['./language-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageButtonComponent {
  public readonly items: MenuItem[] = [
    {
      label: 'En',
      command: () => this.switchLanguage(Language.en),
    },
    {
      label: 'Ru',
      command: () => this.switchLanguage(Language.ru),
    },
  ];

  constructor(
    private translateService: TranslateService,
    private coreFacade: CoreFacade
  ) {}

  private switchLanguage(language: Language) {
    this.translateService.use(language);
    this.coreFacade.setLanguage(language);
  }
}
