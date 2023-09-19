import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

import { DatabaseService } from '../../database/database.service';

@Module({
  providers: [
    ProjectsService,
    DatabaseService,
  ],
  controllers: [ProjectsController],
  exports: [
    ProjectsService,
    DatabaseService,
  ],
})
export class ProjectsModule {}
