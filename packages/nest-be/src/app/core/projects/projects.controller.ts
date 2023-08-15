import { Controller, Get } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('PROJECTS')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getData() {
    return this.projectsService.getData();
  }
}
