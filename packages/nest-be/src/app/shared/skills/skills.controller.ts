import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../auth/auth.guard';

@Public()
@ApiTags('SHARED')
@Controller('skills')
export class SkillsController {
  @Get()
  getData() {
    return 'Hello From Skills';
  }
}
