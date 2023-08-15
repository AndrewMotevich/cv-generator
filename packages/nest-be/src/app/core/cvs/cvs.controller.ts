import { Controller, Get } from '@nestjs/common';
import { CvsService } from './cvs.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('CVS')
@Controller('cvs')
export class CvsController {
  constructor(private readonly cvsService: CvsService) {}

  @Get()
  getData() {
    return this.cvsService.getData();
  }
}
