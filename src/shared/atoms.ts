import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import {
  append, equals, find, reject,
} from 'ramda';
import { Book } from './models';

export const selectedBookAtom = atom<string | null>(null);
export const booksPageAtom = atom(1);
export const starredBooksAtom = atomWithStorage<Array<Book>>('got-app-starred-books', []);
export const starredCharactersAtom = atomWithStorage<Array<string>>('got-app-starred-characters', []);

export const starCharacterDerivedAtom = atom(null, (get, set, character: string) => {
  const characters = get(starredCharactersAtom);
  const isInTheList = find(equals(character), characters);

  if (isInTheList) {
    set(starredCharactersAtom, reject(equals(character), characters));
    return;
  }

  set(starredCharactersAtom, append(character, characters));
});

export const starBookDerivedAtom = atom(null, (get, set, book: Book) => {
  const books = get(starredBooksAtom);
  const isInTheList = find(equals(book), books);

  if (isInTheList) {
    set(starredBooksAtom, reject(equals(book), books));
    return;
  }

  set(starredBooksAtom, append(book, books));
});
