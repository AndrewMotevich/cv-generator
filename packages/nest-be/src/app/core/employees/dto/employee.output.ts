export const employeeOutput = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  departmentId: true,
  specializationId: true,
  department: true,
  specialization: true,
  cvs: {
    include: {
      department: true,
      language: true,
      skills: true,
      specialization: true,
      cvsProjects: {
        include: {
          responsibilities: true,
          teamRoles: true,
          techStack: true,
        },
      },
    },
  },
};
