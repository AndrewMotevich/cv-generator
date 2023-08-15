import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  getData(): { message: string } {
    return { message: 'Hello from Projects' };
  }
}
