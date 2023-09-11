import { EDIT_EMPLOYEES, EMPLOYEES } from '../../shared/constants/routing-paths.consts';
import { EmployeeDto } from '../models/employee.model';

export const BREADCRUMB_EMPLOYEE_LIST = {
  breadcrumbs: [
    {
      label: 'Employees',
      route: EMPLOYEES.fullPath,
    },
  ],
  title: 'HEADER.EMPLOYEES',
  pageInfo: 'BREADCRUMBS.EMPLOYEES_LIST',
};

export const BREADCRUMB_EMPLOYEE_CREATE = {
  breadcrumbs: [
    {
      label: 'Employees',
      route: EMPLOYEES.fullPath,
    },
  ],
  title: 'HEADER.EMPLOYEES',
  pageInfo: 'BREADCRUMBS.EMPLOYEE_CREATE',
};

export const BREADCRUMB_EMPLOYEE_EDIT_FACTORY = (employeeInfo: EmployeeDto) => ({
  breadcrumbs: [
    {
      label: 'Employees',
      route: EMPLOYEES.fullPath,
    },
    {
      label: `${employeeInfo.firstName} ${employeeInfo.lastName}`,
      route: EMPLOYEES.fullPath + EDIT_EMPLOYEES.fullPath + '/' + employeeInfo.id,
    },
  ],
  title: 'HEADER.EMPLOYEES',
  pageInfo: `${employeeInfo.firstName} ${employeeInfo.lastName}'s profile`,
})
