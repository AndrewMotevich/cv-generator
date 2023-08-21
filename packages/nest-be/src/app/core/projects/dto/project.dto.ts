import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';

export class ProjectDto {
  @IsString()
  projectName: string;

  @IsString()
  description: string;

  @IsDate()
  startDate?: Date;

  @IsDate()
  endDate?: Date;

  @IsNumber()
  teamSize: number;

  @IsArray()
  techStack: string[];

  @IsArray()
  responsibilities: string[];

  @IsArray()
  teamRoles: string[];
}
