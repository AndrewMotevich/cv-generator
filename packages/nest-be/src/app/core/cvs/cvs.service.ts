import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CvDto } from './dto/cv.dto';
import { transformCvDto } from '../../database/helpers/transform-cv-dto';

@Injectable()
export class CvsService {
  constructor(private dataBaseService: DatabaseService) {}

  async getCvs() {
    try {
      return this.dataBaseService.cV.findMany({
        include: {
          cvsProjects: {
            include: {
              responsibilities: true,
              teamRoles: true,
              techStack: true,
            },
          },
          language: true,
          skills: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addCv(dto: CvDto) {
    try {
      return await this.dataBaseService.cV.create({
        data: transformCvDto(dto),
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteCv(id: number) {
    try {
      return this.dataBaseService.cV.delete({ where: { id: id } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
