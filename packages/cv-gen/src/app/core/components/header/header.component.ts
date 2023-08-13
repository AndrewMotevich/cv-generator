import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cv-gen-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
