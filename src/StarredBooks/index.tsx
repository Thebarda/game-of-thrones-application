import { Button, Dialog, DialogContent } from '@mui/material';
import { useAtomValue } from 'jotai';
import { isEmpty, T } from 'ramda';
import {
  FC, memo, useCallback, useState,
} from 'react';
import { starredBooksAtom } from '../shared/atoms';
import BookCard from '../Books/Book';

const StarredBooks: FC = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const starredBooks = useAtomValue(starredBooksAtom);

  const close = useCallback((): void => {
    setOpenDialog(false);
  }, []);

  const open = useCallback((): void => {
    setOpenDialog(true);
  }, []);

  return (
    <>
      <Button disabled={isEmpty(starredBooks)} onClick={open}>Show starred books</Button>
      <Dialog onClose={close} open={openDialog} fullWidth maxWidth="md">
        <DialogContent>
          {starredBooks && (
            starredBooks.map((book) => <BookCard key={book.name} {...book} />)
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default memo(StarredBooks, T);
