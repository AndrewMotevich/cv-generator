import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { DatabaseModule } from '../../database/database.module';

import { DepartmentService } from '../../shared/department/department.service';
import { SpecializationService } from '../../shared/specialization/specialization.service';

@Module({
  imports: [DatabaseModule],
  providers: [EmployeesService, DepartmentService, SpecializationService],
  controllers: [EmployeesController],
  exports: [EmployeesService, DepartmentService, SpecializationService],
})
export class EmployeesModule {}
