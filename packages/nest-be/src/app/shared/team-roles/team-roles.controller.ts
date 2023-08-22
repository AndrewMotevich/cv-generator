import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DatabaseService } from '../../database/database.service';
import { Shared } from '../shared.dto';

@ApiTags('SHARED')
@Controller('team-roles')
export class TeamRolesController {
  constructor(private databaseService: DatabaseService) {}

  @ApiOperation({ summary: 'Receive all team-roles' })
  @Get()
  async getData(): Promise<Shared[]> {
    return await this.databaseService.teamRole.findMany();
  }
}
