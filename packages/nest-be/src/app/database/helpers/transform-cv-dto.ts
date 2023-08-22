import { CvDto } from '../../core/cvs/dto/cv.dto';
import { ProjectDto } from '../../core/projects/dto/project.dto';
import { transformProjectDto } from './transform-project-dto.helper';

export function transformCvDto(dto: CvDto) {
  const languages = dto.language.map((language) => ({
    create: {
      level: language.level.toUpperCase(),
      name: language.name.toLowerCase(),
    },
    where: { name: language.name },
  }));

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
      connectOrCreate: languages,
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

export function transformCvPartial(dto: CvDto) {
  const languages = dto?.language?.map((language) => ({
    create: {
      level: language.level.toUpperCase(),
      name: language.name.toLowerCase(),
    },
    where: { name: language.name },
  }));

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
      connectOrCreate: languages,
    },
    skills: { deleteMany: {}, connectOrCreate: skills },
    cvsProjects: {
      deleteMany: {},
      create: transformProjects(dto?.projects),
    },
  };
}
