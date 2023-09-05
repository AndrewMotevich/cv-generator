export class Shared {
  id: number;
  name: string;
}

export class Error {
  message: string;
  statusCode: number;
  error?: string;
}

export class ISharedAllProps {
  departments: Shared[];
  specializations: Shared[];
  skills: Shared[];
  teamRoles: Shared[];
  responsibilities: Shared[];
  languages: Shared[];
}
