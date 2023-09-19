import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../auth/auth.guard';
import { DatabaseService } from '../../database/database.service';
import { Shared } from '../shared.dto';

@Public()
@ApiTags('SHARED')
@Controller('responsibilities')
export class ResponsibilitiesController {
  constructor(private databaseService: DatabaseService) {}

  @ApiOperation({ summary: 'Receive all responsibilities' })
  @Get()
  async getData(): Promise<Shared[]> {
    return await this.databaseService.responsibility.findMany();
  }
}
