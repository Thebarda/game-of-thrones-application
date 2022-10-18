import { map } from 'ramda';
import { PaginatedFetch } from './models';

export const paginatedFetch = async <T>(endpoint: string): Promise<PaginatedFetch<T>> => {
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  const links = response.headers.get('link')?.split(',') || [];

  const pagination = map((link) => ({
    link: link.match(/<(\S+)>/)?.[1] || '',
    text: link.match(/rel="(\S+)"/)?.[1] || '',
  }), links);

  const data = await response.json();

  return {
    data,
    pagination,
  };
};
