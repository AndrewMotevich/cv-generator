import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../auth/auth.guard';

@Public()
@ApiTags('SHARED')
@Controller('responsibilities')
export class ResponsibilitiesController {
  @Get()
  getData() {
    return 'Hello From responsibilities';
  }
}
