import { Body, Controller, Get, Post } from '@nestjs/common';

import { UsersService } from './users.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { Public } from '../auth.guard';
import { Error } from '../../shared/shared.dto';

// @Public()
@ApiBearerAuth()
@ApiTags('USER')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Error', type: Error })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: Error,
  })
  getUsers() {
    return this.usersService.getUsers();
  }

  @Post()
  @ApiOperation({ summary: 'Add new user' })
  @ApiBadRequestResponse({ description: 'Bad request Error', type: Error })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Error', type: Error })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: Error,
  })
  signIn(@Body() user: UserDto) {
    return this.usersService.addUser(user.email, user.password);
  }
}
