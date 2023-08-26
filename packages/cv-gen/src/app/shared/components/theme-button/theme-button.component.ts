import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
export class ThemeButtonComponent implements OnInit {
  public isDarkTheme: Observable<boolean>;

  constructor(private themeService: ThemeService) {}

  public ngOnInit(): void {
    this.isDarkTheme = this.themeService.getIsDarkTheme();
  }

  public switchTheme(): void {
    this.themeService.switchTheme();
  }
}
