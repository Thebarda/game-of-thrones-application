import {
  Button, CircularProgress, Dialog, DialogContent,
} from '@mui/material';
import { useAtomValue } from 'jotai';
import { isEmpty, T } from 'ramda';
import {
  FC, memo, Suspense, useCallback, useState,
} from 'react';
import Characters from '../BookDetails/Characters';
import { starredCharactersAtom } from '../shared/atoms';

const StarredCharacters: FC = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const starredCharacters = useAtomValue(starredCharactersAtom);

  const close = useCallback((): void => {
    setOpenDialog(false);
  }, []);

  const open = useCallback((): void => {
    setOpenDialog(true);
  }, []);

  return (
    <>
      <Button disabled={isEmpty(starredCharacters)} onClick={open}>Show Starred characters</Button>
      <Dialog onClose={close} open={openDialog} fullWidth maxWidth="md">
        <DialogContent>
          {starredCharacters && (
            <Suspense fallback={<CircularProgress variant="indeterminate" size={60} />}>
              <Characters characters={starredCharacters} />
            </Suspense>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default memo(StarredCharacters, T);
