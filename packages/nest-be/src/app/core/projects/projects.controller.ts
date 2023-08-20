import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProjectDto } from './dto/project.dto';
import { Public } from '../../auth/auth.guard';

@Public()
@ApiBearerAuth()
@ApiTags('PROJECTS')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getData() {
    return this.projectsService.getProjects();
  }

  @UsePipes(new ValidationPipe())
  @Post('')
  async createProject(@Body() dto: ProjectDto) {
    const res = await this.projectsService.addProject(dto);
    return res;
  }

  @UsePipes(new ValidationPipe())
  @Delete('/:id')
  async deleteProject(@Param('id', new ParseIntPipe()) id: number) {
    const res = await this.projectsService.deleteProject(id);
    return res;
  }
}
