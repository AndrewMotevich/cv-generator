import { ProjectDto } from '../../core/projects/dto/project.dto';

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
      connectOrCreate: teamRoles
    },
    techStack: {
      connectOrCreate: techStack
    },
    responsibilities: {
      connectOrCreate: responsibilities
    },
  }
}
