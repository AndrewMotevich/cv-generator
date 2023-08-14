export enum Department {
  javascript,
  python,
}

export enum Specialization {
  angular,
  react,
  vue,
}

export interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: Department;
  specialization: Specialization;
}

export const employees: IEmployee[] = [
  {
    id: '1',
    department: Department.javascript,
    email: 'example1@ex.com',
    firstName: 'Ivan1',
    lastName: 'Ivanov1',
    specialization: Specialization.angular,
  },
  {
    id: '2',
    department: Department.python,
    email: 'example2@ex.com',
    firstName: 'Ivan2',
    lastName: 'Ivanov2',
    specialization: Specialization.react,
  },
  {
    id: '3',
    department: Department.javascript,
    email: 'example3@ex.com',
    firstName: 'Ivan3',
    lastName: 'Ivanov3',
    specialization: Specialization.vue,
  },
];
