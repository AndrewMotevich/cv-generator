import { IsString } from 'class-validator';
import { ProjectDto } from '../../projects/dto/project.dto';
import { ApiProperty } from '@nestjs/swagger';

enum Level {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
}

class LanguageDto {
  name: string;
  @ApiProperty({ enum: Level })
  level: string;
}

export class CvDto {
  @IsString()
  cvName: string;
  language: LanguageDto[];
  skills: string[];

  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  email: string;
  @IsString()
  department: string;
  @IsString()
  specialization: string;

  employeeId: number;
  projects: ProjectDto[];
}
