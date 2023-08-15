import { Module } from '@nestjs/common';
import { CvsModule } from './cvs/cvs.module';
import { EmployeesModule } from './employees/employees.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [CvsModule, EmployeesModule, ProjectsModule],
})
export class CoreModule {}
