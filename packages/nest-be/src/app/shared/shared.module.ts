import { Module } from '@nestjs/common';
import { SkillsController } from './skills/skills.controller';
import { TeamRolesController } from './team-roles/team-roles.controller';
import { ResponsibilitiesController } from './responsibilities/responsibilities.controller';
import { DatabaseModule } from '../database/database.module';
import { DepartmentsController } from './departments/departments.controller';
import { SpecializationController } from './specializations/specializations.controller';
import { LanguagesController } from './languages/languages.controller';
import { SharedController } from './shared.controller';
import { LevelsController } from './levels/levels.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    LevelsController,
    SpecializationController,
    DepartmentsController,
    SkillsController,
    TeamRolesController,
    ResponsibilitiesController,
    LanguagesController,
    SharedController,
  ],
})
export class SharedModule {}
