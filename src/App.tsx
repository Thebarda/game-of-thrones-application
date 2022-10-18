import { FC, Suspense } from 'react';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { CircularProgress } from '@mui/material';
import Books from './Books';
import BookDetails from './BookDetails';
import StarredCharacters from './StarredCharacters';
import StarredBooks from './StarredBooks';

dayjs.extend(LocalizedFormat);

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: FC = () => (
  <QueryClientProvider client={client}>
    <StarredCharacters />
    <StarredBooks />
    <Suspense fallback={<CircularProgress variant="indeterminate" size={60} />}>
      <Books />
    </Suspense>
    <BookDetails />
    <ReactQueryDevtools />
  </QueryClientProvider>
);

export default App;
