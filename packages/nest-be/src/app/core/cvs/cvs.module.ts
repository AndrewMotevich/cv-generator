import { Module } from '@nestjs/common';
import { CvsController } from './cvs.controller';
import { CvsService } from './cvs.service';
import { DatabaseService } from '../../database/database.service';

@Module({
  providers: [CvsService, DatabaseService],
  controllers: [CvsController],
  exports: [CvsService, DatabaseService],
})
export class CvsModule {}
