import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { T } from 'ramda';
import { FC, memo } from 'react';
import { elementFetch } from '../shared/elementFetch';

interface Props {
  house: string;
}

const House: FC<Props> = ({ house }) => {
  const { data } = useQuery({
    queryKey: ['house', house],
    queryFn: () => elementFetch<{ name: string; }>(house),
    suspense: true,
  });

  return (
    <Typography>{data?.name}</Typography>
  );
};

export default memo(House, T);
