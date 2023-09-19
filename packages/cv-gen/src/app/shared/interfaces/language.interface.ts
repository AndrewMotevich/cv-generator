export interface Language {
  id: number;
  level: {name: string, id: number};
  name: {name: string, id: number};
}

export type LanguageDto = {
  level: string
  name: string
}
