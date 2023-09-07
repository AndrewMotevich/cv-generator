import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EmployeesFacade } from '../../../ngrx/employees/employees.facade';

@UntilDestroy()
@Component({
  selector: 'cv-gen-edit-employee.page',
  templateUrl: './edit-employee.page.component.html',
  styleUrls: ['./edit-employee.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditEmployeePageComponent implements OnInit {
  public cvaEmployeeInfoForm = new FormControl(null);

  public cvaCvForm = new FormControl(null);

  public employeeId: number;

  constructor(
    private employeesFacade: EmployeesFacade,
    private route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    this.employeesFacade.getEmployeeById(this.employeeId);
    this.employeesFacade.selectedEmployee$
      .pipe(untilDestroyed(this))
      .subscribe((employee) => {
        this.cvaEmployeeInfoForm.setValue({
          ...employee,
        });
      });
  }

  public deleteEmployee() {
    this.employeesFacade.deleteEmployee(this.employeeId);
  }
}
