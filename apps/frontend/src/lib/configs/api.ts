import { contracts } from '@aero/api-client';
// import { initQueryClient } from '@ts-rest/react-query';
import { initTsrReactQuery } from '@ts-rest/react-query/v5';

export const api = initTsrReactQuery(contracts, {
  // export const api = initQueryClient(contracts, {
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'include',
  baseHeaders: {},
});
