import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { ProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(private dataBaseService: DatabaseService) {}

  async getProjects() {
    try {
      return this.dataBaseService.project.findMany({
        take: 10,
        include: { techStack: true, responsibilities: true, teamRoles: true },
      });
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async addProject(dto: ProjectDto) {
    try {
      const teamRoles = dto.teamRoles.map((teamRole) => ({
        where: { name: teamRole.toLocaleLowerCase() },
        create: { name: teamRole.toLocaleLowerCase() },
      }));

      const responsibilities = dto.responsibilities.map((responsibility) => ({
        where: { name: responsibility.toLocaleLowerCase() },
        create: { name: responsibility.toLocaleLowerCase() },
      }));

      const techStack = dto.techStack.map((skill) => ({
        where: { name: skill.toLocaleLowerCase() },
        create: { name: skill.toLocaleLowerCase() },
      }));

      return await this.dataBaseService.project.create({
        data: {
          projectName: dto.projectName,
          description: dto.description,
          startDate: dto.startDate,
          endDate: dto.endDate,
          teamSize: dto.teamSize,
          teamRoles: {
            connectOrCreate: teamRoles
          },
          responsibilities: {
            connectOrCreate: responsibilities
          },
          techStack: {
            connectOrCreate: techStack
          },
        },
      });

    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async deleteProject(id: number) {
    try {
      return this.dataBaseService.project.delete({ where: { id: id } });
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
