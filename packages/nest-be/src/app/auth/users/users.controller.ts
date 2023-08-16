import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { Public } from '../auth.guard';
import { Request } from 'express';

@ApiTags('USER')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post()
  signIn(@Req() request: Request, @Body() user: UserDto) {
    const adminPass = request.headers['x_admin_pass'];
    if (!adminPass) {
      return new UnauthorizedException();
    }
    try {
      if (adminPass !== process.env.SUPER_ADMIN_PASSWORD) {
        return new UnauthorizedException();
      }
      return this.usersService.addUser(user.email, user.password);
    } catch {
      return new UnauthorizedException();
    }
  }
}
