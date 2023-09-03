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

  private id: number;

  constructor(
    private employeesFacade: EmployeesFacade,
    private route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.employeesFacade.getEmployeeById(this.id);
    this.employeesFacade.selectedEmployee$
      .pipe(untilDestroyed(this))
      .subscribe((employee) => {
        this.cvaEmployeeInfoForm.setValue({
          ...employee,
        });
      });
  }

  public submitEmployeeInfoForm() {
    if (this.cvaEmployeeInfoForm.invalid) {
      this.cvaEmployeeInfoForm.markAsTouched();
      return;
    }
    this.employeesFacade.updateEmployee(
      this.id,
      this.cvaEmployeeInfoForm.getRawValue()
    );
  }

  public deleteEmployee() {
    this.employeesFacade.deleteEmployee(this.id);
  }

  public clearEmployeeInfoForm() {
    this.cvaEmployeeInfoForm.setValue({
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      specialization: '',
    });
  }

  public submitCvForm() {
    if (this.cvaCvForm.invalid) {
      this.cvaCvForm.markAsTouched();
      return;
    }
    console.log(this.cvaCvForm.getRawValue());
  }
}
