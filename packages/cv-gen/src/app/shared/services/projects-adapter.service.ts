import { Injectable } from '@angular/core';
import {
  IProject,
  ProjectDto,
  ProjectTableData,
} from '../../projects/models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectsAdapter {
  public transformDtoToTableData(dto: IProject[]): ProjectTableData[] {
    return dto.map((project) => ({
      ...project,
      teamRoles: project.teamRoles.map((role) => role.name).join(', '),
      responsibilities: project.responsibilities
        .map((responsibilities) => responsibilities.name)
        .join(', '),
      techStack: project.techStack.map((skill) => skill.name).join(', '),
    }));
  }

  public transformIProjectToProjectDto(project: IProject): ProjectDto {
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

  public transformToDto(project: ProjectTableData): ProjectDto {
    return {
      ...project,
      startDate: new Date(project.startDate),
      endDate: new Date(project.endDate),
      teamRoles: project.teamRoles.split(','),
      responsibilities: project.responsibilities.split(','),
      techStack: project.techStack.split(','),
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public transformData(data: any): ProjectTableData[] | ProjectDto {
    function transform(dto: IProject[]): ProjectTableData[];
    function transform(dto: IProject): ProjectDto;
    function transform(dto: ProjectTableData): ProjectDto;

    // Implementation signature
    function transform(dto: unknown): ProjectTableData[] | ProjectDto {
      if (Array.isArray(dto)) {
        return (dto as IProject[]).map((project) => ({
          ...project,
          teamRoles: project.teamRoles.map((role) => role.name).join(', '),
          responsibilities: project.responsibilities
            .map((responsibilities) => responsibilities.name)
            .join(', '),
          techStack: project.techStack.map((skill) => skill.name).join(', '),
        }));
      }
      // const asIProject = dto as IProject;
      if (typeof (dto as IProject).responsibilities !== 'string') {
        return {
          ...(dto as IProject),
          startDate: new Date((dto as IProject).startDate),
          endDate: new Date((dto as IProject).endDate),
          teamRoles: (dto as IProject).teamRoles.map((role) => role.name),
          responsibilities: (dto as IProject).responsibilities.map(
            (responsibilities) => responsibilities.name
          ),
          techStack: (dto as IProject).techStack.map((skill) => skill.name),
        };
      }
      const asProjectTableData = dto as ProjectTableData;
      return {
        ...asProjectTableData,
        startDate: new Date(asProjectTableData.startDate),
        endDate: new Date(asProjectTableData.endDate),
        teamRoles: asProjectTableData.teamRoles.split(','),
        responsibilities: asProjectTableData.responsibilities.split(','),
        techStack: asProjectTableData.techStack.split(','),
      };
    }

    return transform(data);
  }
}
