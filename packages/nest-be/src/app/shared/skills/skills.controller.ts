import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('SHARED')
@Controller('skills')
export class SkillsController {
  @Get()
  getData() {
    return 'Hello From Skills';
  }
}
