import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cv-gen-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeInfoComponent {}
