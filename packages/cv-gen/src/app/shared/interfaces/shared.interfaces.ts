import { Language } from "./language.interface";

export interface IShared {
  id: number;
  name: string;
}

export interface ISharedAll {
  departments: IShared[];
  specializations: IShared[];
  skills: IShared[];
  teamRoles: IShared[];
  responsibilities: IShared[];
  languages: Language[]
}
