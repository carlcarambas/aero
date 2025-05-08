import { Pigeon } from '@app/pages/MyFlock';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { createPigeon, deletePigeon } from './myflock.service';
import { AxiosError } from 'axios';

export const useCreatePigeonMutation = (
  options?: UseMutationOptions<any | undefined, AxiosError, Omit<Pigeon, 'id'>>
) =>
  useMutation<any | undefined, AxiosError, Omit<Pigeon, 'id'>>({
    mutationFn: (data: Omit<Pigeon, 'id'>) => createPigeon(data),
    ...options,
  });

export const useDeletePigeonMutation = (
  options?: UseMutationOptions<any | undefined, AxiosError, string>
) => {
  return useMutation<any | undefined, AxiosError, string>({
    mutationFn: (id: string) => deletePigeon(id),
    ...options,
  });
};