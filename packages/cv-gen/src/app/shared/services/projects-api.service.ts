import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { API_PATH } from '../../../environments/environment.development';
import {
  IProject,
  ProjectDto
} from '../../projects/models/project.model';
import { ProjectsAdapter } from './projects-adapter.service';

@Injectable({ providedIn: 'root' })
export class ProjectsApiService {
  constructor(
    private http: HttpClient,
    private projectsAdapter: ProjectsAdapter
  ) {}

  public getProjects() {
    return this.http
      .get<IProject[]>(`${API_PATH}/projects`)
      .pipe(
        map((projects) => this.projectsAdapter.transformDtoToTableData(projects))
      );
  }

  public getProjectById(id: number) {
    return this.http
      .get<IProject>(`${API_PATH}/projects/${id}`)
      .pipe(
        map((project) =>
          this.projectsAdapter.transformIProjectToProjectDto(project)
        )
      );
  }

  public addProject(body: ProjectDto) {
    return this.http.post<IProject>(`${API_PATH}/projects`, body);
  }

  public updateProject(id: number, body: ProjectDto) {
    return this.http.put<IProject>(`${API_PATH}/projects/${id}`, body);
  }

  public deleteProject(id: number) {
    return this.http.delete<IProject>(`${API_PATH}/projects/${id}`);
  }
}
