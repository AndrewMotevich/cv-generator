import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH } from '../../../environments/environment.development';
import {
  IProjectTransformed,
  IProject,
  IProjectDto,
} from '../../projects/models/project.model';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProjectsApiService {
  constructor(
    private http: HttpClient,
    private projectsAdapter: ProjectsDtoAdapter
  ) {}

  public getProjects() {
    return this.http
      .get<IProject[]>(`${API_PATH}/projects`)
      .pipe(map((projects) => this.projectsAdapter.transformDto(projects)));
  }

  public addProject(body: IProjectDto) {
    return this.http.post<IProject>(`${API_PATH}/projects`, body);
  }

  public updateProject(id: number, body: IProjectDto) {
    return this.http.put<IProject>(`${API_PATH}/projects/${id}`, body);
  }

  public deleteProject(id: number) {
    return this.http.delete<IProject>(`${API_PATH}/projects/${id}`);
  }
}

@Injectable({ providedIn: 'root' })
export class ProjectsDtoAdapter {
  public transformDto(dto: IProject[]): IProjectTransformed[] {
    return dto.map((project) => ({
      ...project,
      teamRoles: project.teamRoles.map((role) => role.name).join(', '),
      responsibilities: project.responsibilities
        .map((responsibilities) => responsibilities.name)
        .join(', '),
      techStack: project.techStack.map((skill) => skill.name).join(', '),
    }));
  }
}
