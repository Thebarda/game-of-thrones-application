export const elementFetch = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  const data = await response.json();

  return data;
};
