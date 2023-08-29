import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH } from '../../../environments/environment.development';
import { IProject, IProjectDto } from '../../projects/models/project.model';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProjectsApiService {
  constructor(
    private http: HttpClient,
    private projectsAdapter: ProjectsDtoAdapter
  ) {}

  public getProjects() {
    return this.http
      .get<IProjectDto[]>(`${API_PATH}/projects`)
      .pipe(map((projects) => this.projectsAdapter.transformDto(projects)));
  }
}

@Injectable({ providedIn: 'root' })
export class ProjectsDtoAdapter {
  public transformDto(dto: IProjectDto[]): IProject[] {
    return dto.map((project) => ({
      ...project,
      teamRoles: project.teamRoles.map((role) => role.name).join(', '),
      responsibilities: project.responsibilities
        .map((r12y) => r12y.name)
        .join(', '),
      techStack: project.techStack.map((skill) => skill.name).join(', '),
    }));
  }
}
