import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../auth/auth.guard';
import { DatabaseService } from '../../database/database.service';
import { Shared } from '../shared.dto';

@Public()
@ApiTags('SHARED')
@Controller('specializations')
export class SpecializationController {
  constructor(private databaseService: DatabaseService) {}

  @ApiOperation({ summary: 'Receive all specializations' })
  @Get()
  async getData(): Promise<Shared[]> {
    return await this.databaseService.specialization.findMany();
  }
}
