import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class ResponsibilitiesService {
  constructor(private dataBaseService: DatabaseService) {}

  async addUniqResponsibility(responsibility: string) {
    const isResponsibility = await this.dataBaseService.responsibility.findFirst({
      where: { name: responsibility },
    });

    if (isResponsibility) return isResponsibility.id;

    return (
      await this.dataBaseService.responsibility.create({
        data: { name: responsibility },
      })
    ).id;
  }
}
