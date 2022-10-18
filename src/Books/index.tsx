import { FC } from 'react';
import {
  Box, CircularProgress,
} from '@mui/material';

import { useAtom } from 'jotai';
import {
  dec, equals, length, pipe,
} from 'ramda';
import { booksPageAtom } from '../shared/atoms';
import { Book } from '../shared/models';
import BookCard from './Book';
import { useLoadPaginatedContent } from '../shared/useLoadPaginatedContent';

const Books: FC = () => {
  const [booksPage, setBooksPage] = useAtom(booksPageAtom);

  const { lastElementRef, result, isLoading } = useLoadPaginatedContent<Book>({
    page: booksPage,
    setPage: setBooksPage,
    name: 'books',
    baseEndpoint: 'https://www.anapioficeandfire.com/api/books',
  });

  const lastElementIdx = pipe(length, dec)(result);

  return (
    <Box>
      <Box sx={(theme) => ({ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 400px)', gap: theme.spacing(2) })}>
        {result?.map((book, idx) => (
          <div key={book.url} ref={equals(idx, lastElementIdx) ? lastElementRef : undefined}>
            <BookCard {...book} />
          </div>
        ))}
        {isLoading && <CircularProgress variant="indeterminate" size={40} />}
      </Box>
    </Box>
  );
};

export default Books;
