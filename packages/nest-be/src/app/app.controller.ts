import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from './auth/auth.guard';

@ApiTags('HELLO')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @ApiOperation({ summary: 'Receive hello message from API' })
  @ApiResponse({ status: 200, description: 'Receive hello message from API'})
  @Get()
  getData() {
    return this.appService.getData();
  }
}
