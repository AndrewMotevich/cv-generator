import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('SHARED')
@Controller('responsibilities')
export class ResponsibilitiesController {
  @Get()
  getData() {
    return 'Hello From responsibilities';
  }
}
