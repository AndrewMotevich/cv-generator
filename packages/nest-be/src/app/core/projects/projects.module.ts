import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

import { SkillsService } from '../../shared/skills/skills.service';
import { ResponsibilitiesService } from '../../shared/responsibilities/responsibilities.service';
import { TeamRolesService } from '../../shared/team-roles/team-roles.service';
import { DatabaseService } from '../../database/database.service';

@Module({
  providers: [
    ProjectsService,
    DatabaseService,
    SkillsService,
    ResponsibilitiesService,
    TeamRolesService,
  ],
  controllers: [ProjectsController],
  exports: [
    ProjectsService,
    DatabaseService,
    SkillsService,
    ResponsibilitiesService,
    TeamRolesService,
  ],
})
export class ProjectsModule {}
