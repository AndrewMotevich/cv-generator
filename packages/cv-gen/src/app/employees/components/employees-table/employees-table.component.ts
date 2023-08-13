import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cv-gen-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesTableComponent {}
