import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../theme.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cv-gen-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  public darkTheme = new FormControl(true);

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.darkTheme.valueChanges.subscribe((value) => {
      if (value) this.themeService.switchTheme('soho-dark');
      else this.themeService.switchTheme('soho-light');
    });
  }
}
