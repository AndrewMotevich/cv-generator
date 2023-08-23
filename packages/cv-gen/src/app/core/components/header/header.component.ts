import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../theme.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'cv-gen-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  public isDarkTheme: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.isDarkTheme.subscribe((value) => {
      this.themeService.switchTheme(value);
    });
  }

  switchTheme() {
    this.isDarkTheme.next(!this.isDarkTheme.getValue());
  }
}
