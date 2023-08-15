import { Module } from '@nestjs/common';
import { SkillsController } from './skills/skills.controller';
import { TeamRolesController } from './team-roles/team-roles.controller';
import { ResponsibilitiesController } from './responsibilities/responsibilities.controller';

@Module({
  controllers: [
    SkillsController,
    TeamRolesController,
    ResponsibilitiesController,
  ],
})
export class SharedModule {}
