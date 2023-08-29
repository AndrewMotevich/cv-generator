import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH } from '../../../environments/environment.development';
import { IEmployee, IEmployeeDto } from '../../employees/models/employee.model';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeesApiService {
  constructor(
    private http: HttpClient,
    private employeesAdapter: EmployeesDtoAdapter
  ) {}

  public getEmployees() {
    return this.http
      .get<IEmployeeDto[]>(`${API_PATH}/employees`)
      .pipe(map((employees) => this.employeesAdapter.transformDto(employees)));
  }
}

@Injectable({ providedIn: 'root' })
export class EmployeesDtoAdapter {
  public transformDto(dto: IEmployeeDto[]): IEmployee[] {
    return dto.map((employee) => ({
      ...employee,
      department: employee.department.name,
      specialization: employee.specialization.name,
    }));
  }
}
