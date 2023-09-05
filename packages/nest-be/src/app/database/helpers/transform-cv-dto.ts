import { Cv, CvDto } from '../../core/cvs/dto/cv.dto';
import { ProjectDto } from '../../core/projects/dto/project.dto';
import { transformProjectDto } from './transform-project-dto.helper';

export function transformCvDto(dto: CvDto) {
  const skills = dto.skills.map((skill) => ({
    where: { name: skill.toLowerCase() },
    create: { name: skill.toLowerCase() },
  }));

  return {
    cvName: dto.cvName,
    firstName: dto.firstName,
    lastName: dto.lastName,
    email: dto.email,
    department: {
      connectOrCreate: {
        where: { name: dto.department },
        create: { name: dto.department },
      },
    },
    specialization: {
      connectOrCreate: {
        where: { name: dto.specialization },
        create: { name: dto.specialization },
      },
    },
    employeeInfo: { connect: { id: dto.employeeId } },
    language: {
      create: dto.language.map((lang) => ({
        name: {
          connectOrCreate: {
            where: { name: lang.name.name },
            create: { name: lang.name.name },
          },
        },
        level: {
          connectOrCreate: {
            where: { name: lang.level.name },
            create: { name: lang.level.name },
          },
        },
      })),
    },
    skills: { connectOrCreate: skills },
    cvsProjects: {
      create: transformProjects(dto.projects),
    },
  };
}

function transformProjects(projects: ProjectDto[]) {
  return projects.map((project) => transformProjectDto(project));
}

export function transformCvPartial(dto: CvDto, prevCv: Cv) {
  const skills = dto?.skills?.map((skill) => ({
    where: { name: skill.toLowerCase() },
    create: { name: skill.toLowerCase() },
  }));

  return {
    cvName: dto.cvName,
    firstName: dto.firstName,
    lastName: dto.lastName,
    email: dto.email,
    department: {
      connectOrCreate: {
        where: { name: dto?.department },
        create: { name: dto?.department },
      },
    },
    specialization: {
      connectOrCreate: {
        where: { name: dto?.specialization },
        create: { name: dto?.specialization },
      },
    },
    language: {
      deleteMany: {},
      create: dto.language.map((lang) => ({
        name: {
          connectOrCreate: {
            where: { name: lang.name.name },
            create: { name: lang.name.name },
          },
        },
        level: {
          connectOrCreate: {
            where: { name: lang.level.name },
            create: { name: lang.level.name },
          },
        },
      })),
    },
    skills: {
      disconnect: prevCv.skills.map((elem) => ({ id: elem.id })),
      connectOrCreate: skills,
    },
    cvsProjects: {
      deleteMany: {},
      create: transformProjects(dto?.projects),
    },
  };
}
