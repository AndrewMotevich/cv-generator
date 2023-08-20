import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class TeamRolesService {
  constructor(private dataBaseService: DatabaseService) {}

  async addUniqTeamRoles(teamRoles: string[]) {
    return await teamRoles.map(async (teamRole) => {
      const isTeamRole =
        await this.dataBaseService.teamRole.findFirst({
          where: { name: teamRole },
        });
      if (isTeamRole) {
        return isTeamRole.id
      }
      const newTeamRole = await this.dataBaseService.teamRole.create({
        data: { name: teamRole },
      });
      return newTeamRole.id
    });
  }
}
