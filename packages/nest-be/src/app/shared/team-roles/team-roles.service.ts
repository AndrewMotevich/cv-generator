import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class TeamRolesService {
  constructor(private dataBaseService: DatabaseService) {}

  async addUniqTeamRole(teamRole: string) {
    const isTeamRole = await this.dataBaseService.teamRole.findFirst({
      where: { name: teamRole },
    });

    if (isTeamRole) return isTeamRole.id;

    return (
      await this.dataBaseService.teamRole.create({
        data: { name: teamRole },
      })
    ).id;
  }
}
