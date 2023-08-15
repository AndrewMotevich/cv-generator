import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('SHARED')
@Controller('team-roles')
export class TeamRolesController {
  @Get()
  getData() {
    return 'Hello From Team roles';
  }
}
