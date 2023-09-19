import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { AuthFacade } from '../../../ngrx/auth/auth.facade';
import { BREAKPOINTS } from '../../../shared/constants/breakpoints.consts';
import { ABOUT } from '../../../shared/constants/routing-paths.consts';

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

  public readonly aboutPath = ABOUT.path;
  public readonly middleBreakpoint = BREAKPOINTS.medium

  constructor(private authFacade: AuthFacade){}

  logOut(){
    this.authFacade.logOut()
  }
}
