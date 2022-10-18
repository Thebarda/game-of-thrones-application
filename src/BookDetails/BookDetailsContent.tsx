import {
  Box, DialogContent, DialogTitle, Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FC, lazy } from 'react';
import { formatDateTime } from '../shared/utils';
import { elementFetch } from '../shared/elementFetch';
import { BookDetails } from '../shared/models';

const Characters = lazy(() => import('./Characters'));

interface Props {
  bookUrl: string;
}

const BookDetailsContent: FC<Props> = ({ bookUrl }) => {
  const { data } = useQuery({
    queryKey: ['book', bookUrl],
    queryFn: () => elementFetch<BookDetails>(bookUrl),
    suspense: true,
  });

  return (
    <>
      <DialogTitle>{data?.name}</DialogTitle>
      <DialogContent>
        <Typography>Authors:</Typography>
        {data?.authors.map((author) => <Typography key={author}>{author}</Typography>)}
        <br />
        <Typography>
          Number of pages:
          {data?.numberOfPages}
        </Typography>
        <br />
        <Typography>
          Country:
          {data?.country}
        </Typography>
        <br />
        <Typography>
          Publisher:
          {data?.publisher}
        </Typography>
        <br />
        <Typography>
          Date of release:
          {formatDateTime(data?.released)}
        </Typography>
        <br />
        <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', columnGap: '16px' }}>
          <Box>
            <Typography>Characters:</Typography>
            <Box sx={{ height: '350px', overflowY: 'auto' }}>
              <Characters characters={data?.characters || []} />
            </Box>
          </Box>
          <Box>
            <Typography>POV characters:</Typography>
            <Box sx={{ height: '350px', overflowY: 'auto' }}>
              <Characters characters={data?.povCharacters || []} />
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </>
  );
};

export default BookDetailsContent;
