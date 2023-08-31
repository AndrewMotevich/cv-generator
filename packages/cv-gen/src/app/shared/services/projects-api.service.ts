import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH } from '../../../environments/environment.development';
import {
  ProjectTransformed,
  IProject,
  ProjectDto,
} from '../../projects/models/project.model';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProjectsApiService {
  constructor(private http: HttpClient) {}

  public getProjects() {
    return this.http
      .get<IProject[]>(`${API_PATH}/projects`)
      .pipe(map((projects) => this.transformProjectsDto(projects)));
  }

  public getProjectById(id: number) {
    return this.http
      .get<IProject>(`${API_PATH}/projects/${id}`)
      .pipe(map((project) => this.transformSelectedProjectDto(project)));
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

  private transformProjectsDto(dto: IProject[]): ProjectTransformed[] {
    return dto.map((project) => ({
      ...project,
      teamRoles: project.teamRoles.map((role) => role.name).join(', '),
      responsibilities: project.responsibilities
        .map((responsibilities) => responsibilities.name)
        .join(', '),
      techStack: project.techStack.map((skill) => skill.name).join(', '),
    }));
  }

  private transformSelectedProjectDto(project: IProject): ProjectDto {
    return {
      ...project,
      startDate: new Date(project.startDate),
      endDate: new Date(project.endDate),
      teamRoles: project.teamRoles.map((role) => role.name),
      responsibilities: project.responsibilities.map(
        (responsibilities) => responsibilities.name
      ),
      techStack: project.techStack.map((skill) => skill.name),
    };
  }
}
