import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { API_PATH } from '../../../environments/environment.development';
import {
  EmployeeDto,
  EmployeeTransformed,
  IEmployee,
} from '../../employees/models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeesApiService {
  constructor(private http: HttpClient) {}

  public getEmployees() {
    return this.http
      .get<IEmployee[]>(`${API_PATH}/employees`)
      .pipe(map((employees) => this.transformDto(employees)));
  }

  public getEmployeeById(id: number) {
    return this.http
      .get<IEmployee>(`${API_PATH}/employees/${id}`)
      .pipe(map((project) => this.transformSelectedEmployeeDto(project)));
  }

  public addEmployee(employeeDto: EmployeeDto) {
    return this.http.post<IEmployee>(`${API_PATH}/employees`, employeeDto);
  }

  public updateEmployee(id: number, employeeDto: EmployeeDto) {
    return this.http.put<IEmployee>(`${API_PATH}/employees/${id}`, employeeDto);
  }

  public deleteEmployee(id: number) {
    return this.http.delete<IEmployee>(`${API_PATH}/employees/${id}`);
  }

  public transformDto(dto: IEmployee[]): EmployeeTransformed[] {
    return dto.map((employee) => ({
      ...employee,
      department: employee.department.name,
      specialization: employee.specialization.name,
    }));
  }

  private transformSelectedEmployeeDto(employee: IEmployee): EmployeeDto {
    return {
      ...employee,
      department: employee.department.name,
      specialization: employee.specialization.name,
    };
  }
}
