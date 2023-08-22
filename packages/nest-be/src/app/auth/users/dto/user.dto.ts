import { IsEmail, IsString } from 'class-validator';

export class User {
  id: number
  email: string
  password: string
  refreshToken?: string
}

export class Tokens {
  access_token?: string
  refresh_token?: string
}

export class UserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
