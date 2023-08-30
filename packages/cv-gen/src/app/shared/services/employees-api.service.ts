import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH } from '../../../environments/environment.development';
import {
  EmployeeTransformed,
  IEmployee,
} from '../../employees/models/employee.model';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeesApiService {
  constructor(private http: HttpClient) {}

  public getEmployees() {
    return this.http
      .get<IEmployee[]>(`${API_PATH}/employees`)
      .pipe(map((employees) => this.transformDto(employees)));
  }

  public transformDto(dto: IEmployee[]): EmployeeTransformed[] {
    return dto.map((employee) => ({
      ...employee,
      department: employee.department.name,
      specialization: employee.specialization.name,
    }));
  }
}
