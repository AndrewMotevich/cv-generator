export const employeeOutput = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  departmentId: false,
  specializationId: false,
  department: true,
  specialization: true,
  // cvs: {
  //   include: {
  //     department: true,
  //     language: {
  //       include: {
  //         name: true,
  //         level: true
  //       }
  //     },
  //     skills: true,
  //     specialization: true,
  //     cvsProjects: {
  //       include: {
  //         responsibilities: true,
  //         teamRoles: true,
  //         techStack: true,
  //       },
  //     },
  //   },
  // },
};
