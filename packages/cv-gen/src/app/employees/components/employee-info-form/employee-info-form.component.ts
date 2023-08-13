import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cv-gen-info-form',
  templateUrl: './employee-info-form.component.html',
  styleUrls: ['./employee-info-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeInfoFormComponent {}
