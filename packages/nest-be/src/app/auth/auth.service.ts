import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { JWT_ACCESS_OPTIONS, JWT_REFRESH_OPTIONS } from '../config/jwt.config';
import bcrypt from 'bcrypt';
import { Tokens } from './users/dto/user.dto';

@Injectable()
export class AuthService {
  private readonly oneDayInMilliseconds = 86400000;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    pass: string,
    response: Response
  ): Promise<Tokens> {
    try {
      const user = await this.usersService.findOne(username);
      if (!(await bcrypt.compare(pass, user?.password))) {
        throw new ForbiddenException()
      }
      const payload = { email: user.email };
      const tokens = await this.getTokens(payload, response);
      this.usersService.updateRefreshToken(tokens.refresh_token);
      return tokens;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  logOut(response: Response){
    response.cookie('refresh', '', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: this.oneDayInMilliseconds,
    });
    return {message: 'Refresh cookie cleared'}
  }

  async refresh(request: Request, response: Response): Promise<Tokens> {
    const token = request.cookies.refresh;
    if (!token) {
      throw new ForbiddenException('No token!');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      const userToken = await this.usersService.getRefreshToken(payload.email);
      if (userToken.refreshToken !== token) {
        throw new ForbiddenException();
      }
      const tokens = await this.getTokens(payload, response);
      await this.usersService.updateRefreshToken(tokens.refresh_token);
      return tokens;
    } catch {
      throw new ForbiddenException('Incorrect token!');
    }
  }

  private async getTokens(payload: { email: string }, response: Response) {
    const accessToken = await this.jwtService.signAsync(
      { email: payload.email },
      JWT_ACCESS_OPTIONS
    );
    const refreshToken = await this.jwtService.signAsync(
      { email: payload.email },
      JWT_REFRESH_OPTIONS
    );

    response.cookie('refresh', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: this.oneDayInMilliseconds,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
