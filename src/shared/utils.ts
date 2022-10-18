import dayjs from 'dayjs';
import { isNil } from 'ramda';

export const formatDateTime = (date?: string): string => (isNil(date) ? '' : dayjs(date).format('LLL'));
