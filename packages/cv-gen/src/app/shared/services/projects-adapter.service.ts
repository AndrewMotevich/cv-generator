import { Injectable } from '@angular/core';
import {
  IProject,
  ProjectDto,
  ProjectTransformed,
} from '../../projects/models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectsAdapter {
  public transformProjectsDto(dto: IProject[]): ProjectTransformed[] {
    return dto.map((project) => ({
      ...project,
      teamRoles: project.teamRoles.map((role) => role.name).join(', '),
      responsibilities: project.responsibilities
        .map((responsibilities) => responsibilities.name)
        .join(', '),
      techStack: project.techStack.map((skill) => skill.name).join(', '),
    }));
  }

  public transformSelectedProjectDto(project: IProject): ProjectDto {
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

  public transformTransformedToDto(
    project: ProjectTransformed
  ): ProjectDto {
    return {
      ...project,
      startDate: new Date(project.startDate),
      endDate: new Date(project.endDate),
      teamRoles: project.teamRoles.split(','),
      responsibilities: project.responsibilities.split(','),
      techStack: project.techStack.split(','),
    };
  }
}
