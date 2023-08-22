import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CvsService } from './cvs.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiInternalServerErrorResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CvDto } from './dto/cv.dto';
import { Public } from '../../auth/auth.guard';

@Public()
@ApiBearerAuth()
@ApiTags('CVS')
@Controller('cvs')
export class CvsController {
  constructor(private readonly cvsService: CvsService) {}

  @ApiOperation({ summary: 'Get all cvs' })
  @ApiBadRequestResponse({ description: 'Bad request Error', type: Error })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Error', type: Error })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: Error,
  })
  @Get()
  getData() {
    return this.cvsService.getCvs();
  }

  @ApiOperation({ summary: 'Get cv by id' })
  @ApiBadRequestResponse({ description: 'Bad request Error', type: Error })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Error', type: Error })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: Error,
  })
  @Get('/:id')
  getDataById(@Param('id', new ParseIntPipe()) id: number) {
    return this.cvsService.getCvById(id);
  }

  @ApiOperation({ summary: 'Add cv' })
  @ApiBadRequestResponse({ description: 'Bad request Error', type: Error })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Error', type: Error })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: Error,
  })
  @UsePipes(new ValidationPipe())
  @Post('')
  async createCv(@Body() dto: CvDto) {
    const res = await this.cvsService.addCv(dto);
    return res;
  }

  @ApiOperation({ summary: 'Update cv by id' })
  @ApiBadRequestResponse({ description: 'Bad request Error', type: Error })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Error', type: Error })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: Error,
  })
  @UsePipes(new ValidationPipe())
  @Put('/:id')
  async updateCv(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: CvDto
  ) {
    const res = await this.cvsService.updateCv(id, dto);
    return res;
  }

  @ApiOperation({ summary: 'Delete cv by id' })
  @ApiBadRequestResponse({ description: 'Bad request Error', type: Error })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Error', type: Error })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: Error,
  })
  @UsePipes(new ValidationPipe())
  @Delete('/:id')
  async deleteCv(@Param('id', new ParseIntPipe()) id: number) {
    const res = await this.cvsService.deleteCv(id);
    return res;
  }
}
