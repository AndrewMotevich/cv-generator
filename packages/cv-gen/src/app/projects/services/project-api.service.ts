import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH } from 'packages/cv-gen/src/environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ProjectApiService {
  constructor(private http: HttpClient) {}

  public getProjects() {
    return this.http.get(`${API_PATH}/projects`);
    // TODO: handle errors
  }
}
