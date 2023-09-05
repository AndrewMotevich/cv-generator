import { Project, ProjectDto } from '../../core/projects/dto/project.dto';

export function transformProjectDto(project: ProjectDto) {
  const teamRoles = project.teamRoles.map((teamRole) => ({
    where: { name: teamRole.toLowerCase() },
    create: { name: teamRole.toLowerCase() },
  }));

  const responsibilities = project.responsibilities.map((responsibility) => ({
    where: { name: responsibility.toLowerCase() },
    create: { name: responsibility.toLowerCase() },
  }));

  const techStack = project.techStack.map((skill) => ({
    where: { name: skill.toLowerCase() },
    create: { name: skill.toLowerCase() },
  }));

  return {
    ...project,
    teamRoles: {
      connectOrCreate: teamRoles,
    },
    techStack: {
      connectOrCreate: techStack,
    },
    responsibilities: {
      connectOrCreate: responsibilities,
    },
  };
}

export function transformProjectPartial(
  project: ProjectDto,
  previousProject: Project
) {
  const teamRoles = project?.teamRoles?.map((teamRole) => ({
    where: { name: teamRole.toLowerCase() },
    create: { name: teamRole.toLowerCase() },
  }));

  const responsibilities = project?.responsibilities?.map((responsibility) => ({
    where: { name: responsibility.toLowerCase() },
    create: { name: responsibility.toLowerCase() },
  }));

  const techStack = project?.techStack?.map((skill) => ({
    where: { name: skill.toLowerCase() },
    create: { name: skill.toLowerCase() },
  }));

  return {
    ...project,
    teamRoles: {
      disconnect: previousProject.teamRoles.map((elem) => ({ id: elem.id })),
      connectOrCreate: teamRoles,
    },
    techStack: {
      disconnect: previousProject.techStack.map((elem) => ({ id: elem.id })),
      connectOrCreate: techStack,
    },
    responsibilities: {
      disconnect: previousProject.responsibilities.map((elem) => ({
        id: elem.id,
      })),
      connectOrCreate: responsibilities,
    },
  };
}
