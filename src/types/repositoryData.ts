export type Language = string;

export type Repository = {
  id: string;
  name: string;
  languages: Language[];
  url: string;
  isFork: boolean;
};

export type LanguageOption = [id: Language, name: string];

export type Filter = {
  languageId: Language;
  repoName: string;
};
