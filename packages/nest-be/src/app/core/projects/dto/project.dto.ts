import { IsNumber, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  projectName: string;
  startDate: unknown;
  endDate: unknown;
  @IsNumber()
  teamSize: number;
  techStack: unknown;
  description: unknown;
  responsibilities: unknown;
  teamRoles: unknown;
}
