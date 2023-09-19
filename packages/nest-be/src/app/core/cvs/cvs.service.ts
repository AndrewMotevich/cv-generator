import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { Cv, CvDto } from './dto/cv.dto';
import {
  transformCvDto,
  transformCvPartial,
} from '../../database/helpers/transform-cv-dto';
import { cvOutput } from './dto/cv.output';

@Injectable()
export class CvsService {
  constructor(private dataBaseService: DatabaseService) {}

  async getCvs(): Promise<Cv[]> {
    try {
      return await this.dataBaseService.cV.findMany({
        select: cvOutput,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getCvById(id: number): Promise<Cv> {
    try {
      return await this.dataBaseService.cV.findFirstOrThrow({
        where: { id: id },
        select: cvOutput,
      });
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException(error.message);
      throw new BadRequestException(error.code);
    }
  }

  async addCv(dto: CvDto): Promise<Cv> {
    try {
      return await this.dataBaseService.cV.create({
        data: transformCvDto(dto),
        select: cvOutput,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateCv(id: number, dto: CvDto): Promise<Cv> {
    try {
      const prevCv = await this.dataBaseService.cV.findFirstOrThrow({
        where: { id: id },
        select: cvOutput,
      });
      return await this.dataBaseService.cV.update({
        where: { id: id },
        data: transformCvPartial(dto, prevCv),
        select: cvOutput,
      });
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async deleteCv(id: number): Promise<Cv> {
    try {
      return await this.dataBaseService.cV.delete({
        where: { id: id },
        select: cvOutput,
      });
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException(error.message);
      throw new BadRequestException(error.message);
    }
  }
}
