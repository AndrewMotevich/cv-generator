import { Controller, Get } from '@nestjs/common';
import { CvsService } from './cvs.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CVS')
@Controller('cvs')
export class CvsController {
  constructor(private readonly cvsService: CvsService) {}

  @Get()
  getData() {
    return this.cvsService.getData();
  }
}
