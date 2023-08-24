import { Component, ChangeDetectionStrategy } from '@angular/core';
import { EMPLOYEES, PROJECTS } from '../../../shared/constants/routing-paths.consts';

@Component({
  selector: 'cv-gen-side-bar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  public isSidebarCollapsed = false
  public projectsPath = PROJECTS.path
  public employeesPath = EMPLOYEES.path
}
