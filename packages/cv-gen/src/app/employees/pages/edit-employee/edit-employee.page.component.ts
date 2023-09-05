import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CvsFacade } from '../../../ngrx/cvs/cvs.facade';
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

  public id: number;

  public showCvForm = false;

  public isNewCv = false;

  constructor(
    private cvsFacade: CvsFacade,
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

  public selectCv(id: number) {
    if (id) {
      this.isNewCv = false;
      this.cvsFacade.loadCvById(id);
    } else {
      this.isNewCv = true;
    }
    this.showCvForm = true;
  }

  public submitCvForm() {
    if (this.cvaCvForm.invalid) {
      console.log(this.cvaCvForm.getRawValue());
      this.cvaCvForm.markAsTouched();
      return;
    }
    this.cvsFacade.addCv(this.cvaCvForm.getRawValue());
    this.showCvForm = false
  }

  public updateCvForm() {
    if (this.cvaCvForm.invalid) {
      this.cvaCvForm.markAsTouched();
      return;
    }
    console.log(this.cvaCvForm.getRawValue());
  }
}
