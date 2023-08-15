import { Controller, Get } from '@nestjs/common';

@Controller('skills')
export class SkillsController {
  @Get()
  getData() {
    return 'Hello From Skills';
  }
}
