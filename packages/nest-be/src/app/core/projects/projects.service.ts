import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { ProjectDto } from './dto/project.dto';
import { transformProjectDto } from '../../database/helpers/transform-project-dto.helper';

@Injectable()
export class ProjectsService {
  constructor(private dataBaseService: DatabaseService) {}

  async getProjects() {
    try {
      return this.dataBaseService.project.findMany({
        include: { techStack: true, responsibilities: true, teamRoles: true },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addProject(dto: ProjectDto) {
    try {
      return await this.dataBaseService.project.create({
        data: transformProjectDto(dto),
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteProject(id: number) {
    try {
      return this.dataBaseService.project.delete({ where: { id: id } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
