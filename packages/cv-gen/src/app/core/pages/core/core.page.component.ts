import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BREAKPOINTS } from '../../../shared/constants/breakpoints.consts';

@Component({
  selector: 'cv-gen-core.page',
  templateUrl: './core.page.component.html',
  styleUrls: ['./core.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CorePageComponent {
  public readonly middleBreakpoint = BREAKPOINTS.medium;
}
