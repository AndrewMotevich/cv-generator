import { Injectable } from '@nestjs/common';

@Injectable()
export class CvsService {
  getData(): { message: string } {
    return { message: 'Hello from cvs' };
  }
}
