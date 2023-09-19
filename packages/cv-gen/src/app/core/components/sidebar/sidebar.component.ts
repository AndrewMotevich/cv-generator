import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  EMPLOYEES,
  PROJECTS,
} from '../../../shared/constants/routing-paths.consts';

@Component({
  selector: 'cv-gen-side-bar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          width: '15rem',
        })
      ),
      state(
        'closed',
        style({
          width: '5rem',
        })
      ),
      transition('open <=> closed', [animate('1s')]),
    ]),
  ],
})
export class SidebarComponent {
  public isSidebarOpen = true;

  public readonly projectsPath = PROJECTS.path;
  public readonly employeesPath = EMPLOYEES.path;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
