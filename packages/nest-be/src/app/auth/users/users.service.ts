import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
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
    try {
      const hashPassword = await bcrypt.hash(password, 5);
      return await this.databaseService.user.create({
        data: { email, password: hashPassword },
      });
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async getUsers() {
    try {
      return await this.databaseService.user.findMany();
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async getRefreshToken(email: string) {
    try {
      return await this.databaseService.user.findFirst({
        where: { email },
        select: { refreshToken: true },
      });
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }

  async updateRefreshToken(token: string) {
    try {
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
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }

  async findOne(email: string): Promise<UserDto | undefined> {
    try {
      return await this.databaseService.user.findFirst({ where: { email } });
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }
}
