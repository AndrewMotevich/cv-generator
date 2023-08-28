import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ABOUT } from '../../../shared/constants/routing-paths.consts';
import { BREAKPOINTS } from '../../../shared/constants/breakpoints.consts';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';

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

  constructor(private authService: AuthService){}

  logOut(){
    this.authService.logOut()
  }
}
