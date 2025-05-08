import { Pigeon } from '@app/pages/MyFlock';
import apiRest from '@frontend/lib/configs/api-rest';

export const createPigeon = (data: Omit<Pigeon, 'id'>) => {
  return apiRest.post('/pigeons', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deletePigeon = (id: string) => {
  return apiRest.delete(`/pigeons/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
