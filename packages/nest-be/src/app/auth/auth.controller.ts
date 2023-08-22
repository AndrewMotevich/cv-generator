import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';

import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { UserDto } from './users/dto/user.dto';
import { Public } from './auth.guard';
import { Response, Request } from 'express';
import { Error } from '../shared/shared.dto';

@Public()
@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: UserDto })
  @ApiOperation({ summary: 'Sign in and get tokens' })
  @ApiForbiddenResponse({ description: 'Forbidden Error', type: Error })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: Error,
  })
  @Post('login')
  signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() signInDto: UserDto
  ) {
    return this.authService.signIn(
      signInDto.email,
      signInDto.password,
      response
    );
  }

  @ApiOperation({ summary: 'Refresh tokens' })
  @ApiForbiddenResponse({ description: 'Forbidden Error', type: Error})
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: Error,
  })
  @Get('refresh')
  refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.refresh(request, response);
  }
}
