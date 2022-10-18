import { Typography } from '@mui/material';
import {
  isEmpty, isNil, reject, T,
} from 'ramda';
import { FC, memo } from 'react';

interface Props {
  list?: Array<string>;
  title: string;
}

export const removeEmptyValues = reject(isEmpty);

export const isNotDefined = (list: Array<string> = []) => !isNil(removeEmptyValues(list)) && !isEmpty(removeEmptyValues(list));

const ListDetails: FC<Props> = ({ list = [], title }) => (isNotDefined(list) ? (
  <>
    <br />
    <Typography>
      {title}
      :
    </Typography>
    {removeEmptyValues(list).map((item) => <Typography>{item}</Typography>)}
  </>
) : null);

export default memo(ListDetails, T);
