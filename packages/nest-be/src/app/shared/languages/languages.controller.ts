import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../auth/auth.guard';
import { DatabaseService } from '../../database/database.service';
import { Shared } from '../shared.dto';

@Public()
@ApiTags('SHARED')
@Controller('languages')
export class LanguagesController {
  constructor(private databaseService: DatabaseService) {}

  @ApiOperation({ summary: 'Receive all languages' })
  @Get()
  async getData(): Promise<Shared[]> {
    return await this.databaseService.language.findMany();
  }
}
