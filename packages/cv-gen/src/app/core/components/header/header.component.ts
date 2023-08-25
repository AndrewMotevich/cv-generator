import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { ABOUT } from '../../../shared/constants/routing-paths.consts';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'cv-gen-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public isDarkTheme: BehaviorSubject<boolean> = new BehaviorSubject(true);

  public isNavigationSidebarVisible = false;

  public isSettingsSidebarVisible = false;

  public aboutPath = ABOUT.path;
}
