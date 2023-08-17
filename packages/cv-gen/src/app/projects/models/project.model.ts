export interface IProject {
  id: number;
  projectName: string;
  startDate?: Date;
  endDate?: Date;
  teamSize?: number;
  techStack?: unknown[];
  description?: string;
  responsibilities?: unknown[];
  teamRoles?: unknown[];
}
