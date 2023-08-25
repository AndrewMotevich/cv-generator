import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ProjectsApiService {
  constructor(private http: HttpClient) {}

  public getProjects() {
    return this.http.get(`${API_PATH}/projects`);
  }
}
