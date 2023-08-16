import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class DepartmentService {
  constructor(private dataBaseService: DatabaseService) {}

  async addUniqDepartment(department: string) {
    const isDepartment = await this.dataBaseService.department.findFirst({
      where: { name: department },
    });

    if (isDepartment) return isDepartment.id;

    return (
      await this.dataBaseService.department.create({
        data: { name: department },
      })
    ).id;
  }
}
