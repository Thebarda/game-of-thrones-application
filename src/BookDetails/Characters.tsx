import { Box, CircularProgress } from '@mui/material';
import {
  dec, equals, inc, length, pipe, slice,
} from 'ramda';
import { FC, Suspense, useState } from 'react';
import { useIntersectionObserver } from '../shared/useIntersectionObserver';
import Character from './Character';

interface Props {
  characters: Array<string>;
}

const limit = 10;

const Characters: FC<Props> = ({ characters }) => {
  const [page, setPage] = useState(1);
  const totalCharacters = length(characters);
  const maxPage = Math.ceil(totalCharacters / limit);

  const isLastPage = equals(page, maxPage);

  const lastElementRef = useIntersectionObserver({
    isLastPage,
    loading: false,
    action: () => {
      setPage((currentPage) => inc(currentPage));
    },
  });

  const displayedCharacters = slice(0, isLastPage ? totalCharacters : page * limit, characters);

  const lastElementIdx = pipe(length, dec)(displayedCharacters);

  return (
    <Box sx={(theme) => ({ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 250px)', gap: theme.spacing(2) })}>
      {displayedCharacters.map((character, idx) => (
        <Box
          key={character}
          ref={equals(lastElementIdx, idx) ? lastElementRef : undefined}
          sx={(theme) => ({
            border: '1px solid grey',
            borderRadius: '4px',
            padding: theme.spacing(1),
          })}
        >
          <Suspense fallback={<CircularProgress variant="indeterminate" size={20} />}>
            <Character character={character} />
          </Suspense>
        </Box>
      ))}
    </Box>
  );
};

export default Characters;
