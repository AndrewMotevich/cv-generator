import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ProjectDto } from './dto/project.dto';
import { Public } from '../../auth/auth.guard';
import { Error } from '../../shared/shared.dto';

@Public()
@ApiBearerAuth()
@ApiTags('PROJECTS')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({ summary: 'Get projects' })
  @ApiBadRequestResponse({ description: 'Bad request Error', type: Error })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: Error,
  })
  @Get()
  getData() {
    return this.projectsService.getProjects();
  }

  @ApiOperation({ summary: 'Get project by id' })
  @ApiBadRequestResponse({ description: 'Bad request Error', type: Error })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: Error,
  })
  @Get('/:id')
  getDataById(@Param('id', new ParseIntPipe()) id: number) {
    return this.projectsService.getProjectById(id);
  }

  @ApiOperation({ summary: 'Add project' })
  @ApiBadRequestResponse({ description: 'Bad request Error', type: Error })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: Error,
  })
  @UsePipes(new ValidationPipe())
  @Post('')
  async createProject(@Body() dto: ProjectDto) {
    const res = await this.projectsService.addProject(dto);
    return res;
  }

  @ApiOperation({ summary: 'Update project by id' })
  @ApiBadRequestResponse({ description: 'Bad request Error', type: Error })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: Error,
  })
  @Put('/:id')
  async updateProject(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: ProjectDto
  ) {
    const res = await this.projectsService.updateProject(id, dto);
    return res;
  }

  @ApiOperation({ summary: 'Delete project by id' })
  @ApiBadRequestResponse({ description: 'Bad request Error', type: Error })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: Error,
  })
  @UsePipes(new ValidationPipe())
  @Delete('/:id')
  async deleteProject(@Param('id', new ParseIntPipe()) id: number) {
    const res = await this.projectsService.deleteProject(id);
    return res;
  }
}
