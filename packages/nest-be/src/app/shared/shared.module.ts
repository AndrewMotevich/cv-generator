import { Module } from '@nestjs/common';
import { SkillsController } from './skills/skills.controller';
import { TeamRolesController } from './team-roles/team-roles.controller';
import { ResponsibilitiesController } from './responsibilities/responsibilities.controller';
import { DatabaseModule } from '../database/database.module';
import { DepartmentsController } from './department/department.controller';
import { SpecializationController } from './specialization/specialization.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    SpecializationController,
    DepartmentsController,
    SkillsController,
    TeamRolesController,
    ResponsibilitiesController,
  ],
})
export class SharedModule {}
