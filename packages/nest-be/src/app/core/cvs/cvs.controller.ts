import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CvsService } from './cvs.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CvDto } from './dto/cv.dto';
import { Public } from '../../auth/auth.guard';

@Public()
@ApiBearerAuth()
@ApiTags('CVS')
@Controller('cvs')
export class CvsController {
  constructor(private readonly cvsService: CvsService) {}

  @Get()
  getData() {
    return this.cvsService.getCvs();
  }

  @UsePipes(new ValidationPipe())
  @Post('')
  async createCv(@Body() dto: CvDto) {
    const res = await this.cvsService.addCv(dto);
    return res;
  }

  @UsePipes(new ValidationPipe())
  @Delete('/:id')
  async deleteCv(@Param('id', new ParseIntPipe()) id: number) {
    const res = await this.cvsService.deleteCv(id);
    return res;
  }
}
