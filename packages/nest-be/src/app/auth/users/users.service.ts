import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [
    {
      email: 'admin@admin.com',
      password: 'Admin123',
    },
    {
      email: 'root',
      password: 'admin',
    },
  ];

  async findOne(username: string): Promise<UserDto | undefined> {
    return this.users.find((user) => user.email === username);
  }
}
