import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { DatabaseService } from '../../database/database.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JWT_REFRESH_OPTIONS } from '../../config/jwt.config';

@Injectable()
export class UsersService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService
  ) {}

  async addUser(email: string, password: string) {
    const hashPassword = await bcrypt.hash(password, 5);
    return await this.databaseService.user.create({
      data: { email, password: hashPassword },
    });
  }

  async getUsers() {
    return await this.databaseService.user.findMany();
  }

  async getRefreshToken(email: string) {
    return await this.databaseService.user.findFirst({
      where: { email },
      select: { refreshToken: true },
    });
  }

  async updateRefreshToken(token: string) {
    const payload: { email: string } = await this.jwtService.verifyAsync(
      token,
      { secret: process.env.JWT_REFRESH_SECRET }
    );
    const newToken = await this.jwtService.signAsync(
      { email: payload.email },
      JWT_REFRESH_OPTIONS
    );
    await this.databaseService.user.update({
      where: { email: payload.email },
      data: { refreshToken: newToken },
    });
  }

  async findOne(email: string): Promise<UserDto | undefined> {
    return await this.databaseService.user.findFirst({ where: { email } });
  }
}
