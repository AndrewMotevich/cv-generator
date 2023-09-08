import { EDIT_EMPLOYEES, EMPLOYEES } from '../../shared/constants/routing-paths.consts';
import { EmployeeDto } from '../models/employee.model';

export const BREADCRUMB_EMPLOYEE_LIST = {
  breadcrumbs: [
    {
      label: 'Employees',
      route: EMPLOYEES.fullPath,
    },
  ],
  title: 'Employees',
  pageInfo: 'Employees list',
};

export const BREADCRUMB_EMPLOYEE_CREATE = {
  breadcrumbs: [
    {
      label: 'Employees',
      route: EMPLOYEES.fullPath,
    },
  ],
  title: 'Employees',
  pageInfo: 'Create Employee',
};

export const BREADCRUMB_EMPLOYEE_EDIT = (employeeInfo: EmployeeDto) => ({
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
  title: 'Employees',
  pageInfo: `${employeeInfo.firstName} ${employeeInfo.lastName}'s profile`,
})
