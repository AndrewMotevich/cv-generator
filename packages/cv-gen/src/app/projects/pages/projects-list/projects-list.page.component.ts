import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cv-gen-project-list.page',
  templateUrl: './projects-list.page.component.html',
  styleUrls: ['./projects-list.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListPageComponent {}
