import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cv-gen-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectTableComponent {}
