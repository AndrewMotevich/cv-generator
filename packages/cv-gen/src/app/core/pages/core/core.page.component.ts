import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cv-gen-core.page',
  templateUrl: './core.page.component.html',
  styleUrls: ['./core.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CorePageComponent {
  public middleBreakpoint = 980
}
