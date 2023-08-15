import { Controller, Get } from '@nestjs/common';

@Controller('responsibilities')
export class ResponsibilitiesController {
  @Get()
  getData() {
    return 'Hello From responsibilities';
  }
}
