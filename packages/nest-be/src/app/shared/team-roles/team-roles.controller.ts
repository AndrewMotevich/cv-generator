import { Controller, Get } from '@nestjs/common';

@Controller('team-roles')
export class TeamRolesController {
  @Get()
  getData() {
    return 'Hello From Team roles';
  }
}
