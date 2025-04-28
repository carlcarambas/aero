import { Pigeon } from '@app/pages/MyFlock';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const usePigeonsQuery = () => {
  return useQuery({
    queryKey: ['pigeons'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/pigeons`);
      const data = await response.json();
      return data as Pigeon[];
    },
    placeholderData: keepPreviousData,
    retry: 3,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
