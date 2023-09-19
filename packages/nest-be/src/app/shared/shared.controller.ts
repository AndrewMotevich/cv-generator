import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DatabaseService } from '../database/database.service';
import { Public } from '../auth/auth.guard';
import { ISharedAllProps } from './shared.dto';

@Public()
@ApiTags('SHARED')
@Controller('all-shared')
export class SharedController {
  constructor(private databaseService: DatabaseService) {}

  @ApiOperation({ summary: 'Receive all shared collections by one request' })
  @Get()
  async getData(): Promise<ISharedAllProps> {
    return {
      departments: await this.databaseService.department.findMany(),
      specializations: await this.databaseService.specialization.findMany(),
      skills: await this.databaseService.skill.findMany(),
      teamRoles: await this.databaseService.teamRole.findMany(),
      responsibilities: await this.databaseService.responsibility.findMany(),
      languages: await this.databaseService.language.findMany(),
    };
  }
}
