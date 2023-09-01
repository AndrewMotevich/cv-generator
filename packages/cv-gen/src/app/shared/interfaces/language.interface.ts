export interface Language {
  id: number;
  level: string;
  name: string;
}

export type LanguageDto = Omit<Language, 'id'>
