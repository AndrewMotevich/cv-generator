import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class SkillsService {
  constructor(private dataBaseService: DatabaseService) {}

  async addUniqSkill(skill: string) {
    const isSkill = await this.dataBaseService.skill.findFirst({
      where: { name: skill },
    });

    if (isSkill) return isSkill.id;

    return (
      await this.dataBaseService.skill.create({
        data: { name: skill },
      })
    ).id;
  }
}
