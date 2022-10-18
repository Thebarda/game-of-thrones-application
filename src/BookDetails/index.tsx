import { CircularProgress, Dialog, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { isNil, T } from 'ramda';
import {
  FC, memo, Suspense, useCallback,
} from 'react';
import { selectedBookAtom } from '../shared/atoms';
import BookDetailsContent from './BookDetailsContent';

const BookDetails: FC = () => {
  const [selectedBook, setSelectedBook] = useAtom(selectedBookAtom);

  const closeBookDetails = useCallback((): void => {
    setSelectedBook(null);
  }, []);

  const isBookDetailOpened = !isNil(selectedBook);

  return (
    <Dialog onClose={closeBookDetails} open={isBookDetailOpened} fullWidth maxWidth="xl">
      {selectedBook && (
        <Suspense fallback={<DialogContent><CircularProgress variant="indeterminate" size={60} /></DialogContent>}>
          <BookDetailsContent bookUrl={selectedBook} />
        </Suspense>
      )}
    </Dialog>
  );
};

export default memo(BookDetails, T);
