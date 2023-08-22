export const cvOutput = {
  id: true,
  cvName: true,
  firstName: true,
  lastName: true,
  email: true,
  department: true,
  specialization: true,
  language: true,
  skills: true,
  employeeId: true,
  departmentId: false,
  specializationId: false,
  cvsProjects: {
    include: {
      responsibilities: true,
      teamRoles: true,
      techStack: true,
    },
  },
};
