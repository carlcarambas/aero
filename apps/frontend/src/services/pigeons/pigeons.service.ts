import { useQuery } from '@tanstack/react-query';

export const usePigeonsQuery = () => {
  return useQuery({
    queryKey: ['pigeons'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/pigeons');
      const data = await response.json();
      return data;
    },
  });
};
