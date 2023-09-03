import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import {
  transformProjectDto
} from '../../database/helpers/transform-project-dto.helper';
import { Project, ProjectDto } from './dto/project.dto';
import { projectOutput } from './dto/project.output';

@Injectable()
export class ProjectsService {
  constructor(private dataBaseService: DatabaseService) {}

  async getProjects(): Promise<Project[]> {
    try {
      return await this.dataBaseService.project.findMany({
        select: projectOutput,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getProjectById(id: number): Promise<Project> {
    try {
      return await this.dataBaseService.project.findFirstOrThrow({
        where: { id: id },
        select: projectOutput,
      });
    } catch (error) {
      if (error.code === "P2025") throw new NotFoundException(error.message)
      throw new BadRequestException(error.code);
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

  async updateProject(id: number, dto: ProjectDto): Promise<Project> {
    try {
      return await this.dataBaseService.project.update({
        where: { id: id },
        data: transformProjectDto(dto),
        select: projectOutput,
      });
    } catch (error) {
      if (error.code === "P2025") throw new NotFoundException(error.message)
      throw new BadRequestException(error.message);
    }
  }

  async deleteProject(id: number): Promise<Project> {
    try {
      return await this.dataBaseService.project.delete({
        where: { id: id },
        select: projectOutput,
      });
    } catch (error) {
      if (error.code === "P2025") throw new NotFoundException(error.message)
      throw new BadRequestException(error.code);
    }
  }
}
