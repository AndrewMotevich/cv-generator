import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../auth/auth.guard';
import { DatabaseService } from '../../database/database.service';

@Public()
@ApiTags('SHARED')
@Controller('languages')
export class LanguagesController {
  constructor(private databaseService: DatabaseService) {}

  @Get()
  async getData() {
    return await this.databaseService.language.findMany();
  }
}
