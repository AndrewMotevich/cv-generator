import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class ResponsibilitiesService {
  constructor(private dataBaseService: DatabaseService) {}

  async addUniqResponsibilities(responsibilities: string[]) {
    const responsibilitiesArray: number[] = []

    await responsibilities.forEach(async (responsibility) => {
      const isResponsibility =
        await this.dataBaseService.responsibility.findFirst({
          where: { name: responsibility },
        });
      if (isResponsibility) {
        responsibilitiesArray.push(isResponsibility.id)
        return
      }
      const newResponsibility = await this.dataBaseService.responsibility.create({
        data: { name: responsibility },
      });
      return responsibilitiesArray.push(newResponsibility.id)
    });

    return await responsibilitiesArray
  }
}
