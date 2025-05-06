import { Pigeon } from '@app/pages/MyFlock';
import axios from 'axios';

export const createPigeon = (data: Omit<Pigeon, 'id'>) => {
  return axios.post('/pigeons', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
