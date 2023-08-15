import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from './users/dto/user.dto';
import { Public } from './auth.guard';
import { Response, Request } from 'express';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
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

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.refresh(request, response);
  }
}
