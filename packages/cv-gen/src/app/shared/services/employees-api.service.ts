import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH } from '../../../environments/environment.development';
import { IEmployee } from '../../employees/models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeesApiService {
  constructor(private http: HttpClient) {}

  public getEmployees() {
    return this.http.get<IEmployee[]>(`${API_PATH}/employees`);
  }
}
