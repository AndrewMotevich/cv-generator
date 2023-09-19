import { INestApplication, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient {
  async onOnModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async enableShutdownHook(app: INestApplication) {
    const newLocal = 'beforeExit' as never;
    this.$on(newLocal, async () => {
      await app.close();
    });
  }
}
