import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsOptions: CorsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:4200', "http://localhost:8080"],
  methods: 'GET,PATCH,POST,PUT,DELETE,OPTIONS',
  credentials: true,
};
