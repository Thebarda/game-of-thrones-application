import {
  Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography,
} from '@mui/material';
import { useAtomValue, useSetAtom } from 'jotai';
import { FC } from 'react';
import { find, propEq } from 'ramda';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { formatDateTime } from '../shared/utils';
import { selectedBookAtom, starBookDerivedAtom, starredBooksAtom } from '../shared/atoms';
import { Book } from '../shared/models';

const BookCard: FC<Book> = ({
  url, released, name, publisher,
}) => {
  const setSelectedBook = useSetAtom(selectedBookAtom);

  const starredBooks = useAtomValue(starredBooksAtom);
  const starBook = useSetAtom(starBookDerivedAtom);

  const selectBook = (): void => {
    setSelectedBook(url);
  };

  const isStarred = find(propEq('name', name), starredBooks);

  return (
    <Card>
      <CardHeader title={name} />
      <CardContent>
        <IconButton
          size="small"
          onClick={() => starBook({
            url, name, released, publisher,
          })}
        >
          {isStarred ? <StarIcon fontSize="small" color="primary" /> : <StarBorderIcon fontSize="small" />}
        </IconButton>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>{publisher}</Typography>
          <Typography>{formatDateTime(released)}</Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={selectBook}>View details</Button>
      </CardActions>
    </Card>
  );
};

export default BookCard;
