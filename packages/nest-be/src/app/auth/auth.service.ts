import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Injectable()
export class AuthService {
  private readonly oneDayInMilliseconds = 86400000;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, pass: string, response: Response) {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email };
    return this.getTokens(payload, response);
  }

  async refresh(request: Request, response: Response) {
    const token = request.cookies.refresh;
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      return this.getTokens(payload, response);
    } catch {
      throw new UnauthorizedException();
    }
  }

  private async getTokens(payload: { email: string }, response: Response) {
    const accessToken = await this.jwtService.signAsync(
      { email: payload.email },
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '60m',
      }
    );
    const refreshToken = await this.jwtService.signAsync(
      { email: payload.email },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '1d',
      }
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
