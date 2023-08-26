import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  EMPLOYEES,
  PROJECTS,
} from '../../../shared/constants/routing-paths.consts';

@Component({
  selector: 'cv-gen-side-bar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  public isSidebarCollapsed: BehaviorSubject<boolean>;

  public readonly projectsPath = PROJECTS.path;
  public readonly employeesPath = EMPLOYEES.path;

  public ngOnInit(): void {
    this.isSidebarCollapsed = new BehaviorSubject(false);
    console.log('dsf')
  }
}
