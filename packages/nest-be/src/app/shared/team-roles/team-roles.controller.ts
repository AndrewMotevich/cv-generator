import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../auth/auth.guard';

@Public()
@ApiTags('SHARED')
@Controller('team-roles')
export class TeamRolesController {
  @Get()
  getData() {
    return 'Hello From Team roles';
  }
}
