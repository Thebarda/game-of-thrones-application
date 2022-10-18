export interface PaginationLink { link: string; text: string }

export interface PaginatedFetch<T> {
  pagination: Array<PaginationLink>;
  data: Array<T>;
}

export interface Book {
  url: string;
  publisher: string;
  name: string;
  released: string;
}

export interface BookDetails {
  name: string;
  authors: Array<string>;
  numberOfPages: number;
  publisher: string;
  country: string;
  released: string;
  povCharacters: Array<string>;
  characters: Array<string>;
}

export interface Character {
  name: string;
  gender: string;
  culture: string;
  titles: Array<string>;
  aliases: Array<string>;
  father: string;
  mother: string;
  spouse: string;
  allegiances: Array<string>;
  playedBy: Array<string>;
}
