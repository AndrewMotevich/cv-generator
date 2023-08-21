import { Module } from '@nestjs/common';
import { SkillsController } from './skills/skills.controller';
import { TeamRolesController } from './team-roles/team-roles.controller';
import { ResponsibilitiesController } from './responsibilities/responsibilities.controller';
import { DatabaseModule } from '../database/database.module';
import { DepartmentsController } from './departments/departments.controller';
import { SpecializationController } from './specializations/specializations.controller';
import { LanguagesController } from './languages/languages.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    SpecializationController,
    DepartmentsController,
    SkillsController,
    TeamRolesController,
    ResponsibilitiesController,
    LanguagesController
  ],
})
export class SharedModule {}
