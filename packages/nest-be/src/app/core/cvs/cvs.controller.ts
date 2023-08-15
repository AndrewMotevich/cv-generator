import { Controller, Get } from '@nestjs/common';
import { CvsService } from './cvs.service';

@Controller('cvs')
export class CvsController {
  constructor(private readonly cvsService: CvsService) {}

  @Get()
  getData() {
    return this.cvsService.getData();
  }
}
