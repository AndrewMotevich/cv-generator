import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { ThemeService } from '../../../theme.service';

@Component({
  selector: 'cv-gen-theme-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './theme-button.component.html',
  styleUrls: ['./theme-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeButtonComponent {
  public isDarkTheme: Observable<boolean> = this.themeService.isDarkTheme;

  constructor(private themeService: ThemeService) {}

  public switchTheme() {
    this.themeService.switchTheme();
  }
}
