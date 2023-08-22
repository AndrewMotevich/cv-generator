import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { Project, ProjectDto } from './dto/project.dto';
import { transformProjectDto } from '../../database/helpers/transform-project-dto.helper';
import { projectOutput } from './dto/project.output';

@Injectable()
export class ProjectsService {
  constructor(private dataBaseService: DatabaseService) {}

  async getProjects(): Promise<Project[]> {
    try {
      return this.dataBaseService.project.findMany({
        select: projectOutput,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addProject(dto: ProjectDto): Promise<Project> {
    try {
      return await this.dataBaseService.project.create({
        data: transformProjectDto(dto),
        select: projectOutput,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteProject(id: number): Promise<Project> {
    try {
      return this.dataBaseService.project.delete({
        where: { id: id },
        select: projectOutput,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
