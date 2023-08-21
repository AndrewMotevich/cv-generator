import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { Public } from '../auth.guard';

@Public()
@ApiTags('USER')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  signIn(@Body() user: UserDto) {
    return this.usersService.addUser(user.email, user.password);
  }
}
