import { Module } from '@nestjs/common';
import { CvsController } from './cvs.controller';
import { CvsService } from './cvs.service';

@Module({
  providers: [CvsService],
  controllers: [CvsController],
  exports: [CvsService],
})
export class CvsModule {}
