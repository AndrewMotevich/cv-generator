import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ABOUT } from '../../../shared/constants/routing-paths.consts';
import { BREAKPOINTS } from '../../../shared/constants/breakpoints.consts';
import { BehaviorSubject } from 'rxjs';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'cv-gen-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public isSettingsObservable = new BehaviorSubject<boolean>(false);
  public isNavigationObservable = new BehaviorSubject<boolean>(false);

  public aboutPath = ABOUT.path;

  public middleBreakpoint = BREAKPOINTS.medium
}
