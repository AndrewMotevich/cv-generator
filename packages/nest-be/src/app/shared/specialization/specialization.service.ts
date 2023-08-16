import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class SpecializationService {
  constructor(private dataBaseService: DatabaseService) {}

  async addUniqSpecialization(specialization: string) {
    const isSpecialization =
      await this.dataBaseService.specialization.findFirst({
        where: { name: specialization },
      });

    if (isSpecialization) return isSpecialization.id;

    return (
      await this.dataBaseService.specialization.create({
        data: { name: specialization },
      })
    ).id;
  }
}
