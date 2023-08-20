import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class SkillsService {
  constructor(private dataBaseService: DatabaseService) {}

  async addUniqSkills(skills: string[]) {
    return await skills.map(async (skill) => {
      const isSkill =
        await this.dataBaseService.skill.findFirst({
          where: { name: skill },
        });
      if (isSkill) {
        return isSkill.id
      }
      const newSkill = await this.dataBaseService.skill.create({
        data: { name: skill },
      });
      return newSkill.id
    });
  }
}
