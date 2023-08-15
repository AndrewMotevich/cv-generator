import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsOptions: CorsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:4200'],
  methods: 'GET,PATCH,POST,PUT,DELETE,OPTIONS',
  credentials: true,
};
