import { CvDto } from '../models/cvs.model';

export const EMPTY_CV: CvDto = {
  id: 0,
  isNew: true,
  cvName: 'New Cv',
  department: '',
  specialization: '',
  email: '',
  employeeId: 0,
  firstName: '',
  lastName: '',
  skills: [],
  language: [],
  projects: [],
};
