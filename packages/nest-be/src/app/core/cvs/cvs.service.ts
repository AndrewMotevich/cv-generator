import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { Cv, CvDto } from './dto/cv.dto';
import { transformCvDto } from '../../database/helpers/transform-cv-dto';
import { cvOutput } from './dto/cv.output';

@Injectable()
export class CvsService {
  constructor(private dataBaseService: DatabaseService) {}

  async getCvs(): Promise<Cv[]> {
    try {
      return this.dataBaseService.cV.findMany({
        select: cvOutput,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addCv(dto: CvDto) {
    try {
      return await this.dataBaseService.cV.create({
        data: transformCvDto(dto),
        select: cvOutput,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteCv(id: number) {
    try {
      return this.dataBaseService.cV.delete({
        where: { id: id },
        select: cvOutput,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
