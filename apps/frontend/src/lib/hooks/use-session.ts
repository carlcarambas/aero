import { useNavigate } from 'react-router-dom';
import { AuthStore, useAuthStore } from './use-auth-store';
import { api } from '../configs/api';
import { useQuery } from '@tanstack/react-query';
import { GetMeResponse } from '@aero/api-client';

type UseSessionReturn = {
  user: AuthStore['user'];
  status: AuthStore['status'];
  refresh: () => void;
  signOut: () => Promise<void>;
};

export const useSession = (): UseSessionReturn => {
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const signOutMutation = api.auth.logout.useMutation({
    onSuccess: () => {
      authStore.clear();
      navigate('/');
    },
  });

  // ** CORS issue
  // const meQuery = api.auth.me.useQuery(['me'], undefined, {

  // const meQuery = api.auth.me.useQuery(['me'], undefined, {
  //   queryKey: ['me'],
  //   enabled: authStore.user === null,
  //   refetchOnWindowFocus: false,
  //   retry(failureCount, error) {
  //     return error.status !== 403 && failureCount < 3;
  //   },
  //   throwOnError: true,
  // });

  // ** CORS issue
  // const meQuery = api.auth.me.useQuery(
  //   ['me'],
  //   async () => {
  //     const res = await api.auth.me.query();

  //     if (res.status === 403) {
  //       authStore.clear();
  //       navigate('/');
  //     } else if (res.status === 200) {
  //       authStore.set({ user: res.body, status: 'authenticated' });
  //     }

  //     return res;
  //   },
  //   {
  //     queryKey: ['me'],
  //     enabled: authStore.user === null,
  //     refetchOnWindowFocus: false,
  //     retry(failureCount, error) {
  //       return error.status !== 403 && failureCount < 3;
  //     },
  //   }
  // );

  // ** 403 as expected
  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await api.auth.me.query();
      if (res.status === 403) {
        authStore.clear();
        navigate('/');
      } else if (res.status === 200) {
        authStore.set({ user: res.body, status: 'authenticated' });
      }

      return res;
    },
    enabled: authStore.user === null,
    refetchOnWindowFocus: false,
    // retry(failureCount, error: GetMeResponse) {
    retry(failureCount, error: any) {
      return error.status !== 403 && failureCount < 3;
    },
  });

  // ** CORS issue
  // const apiQueryClient = api.useQueryClient();
  // const meQuery2 = api.auth.me.useQuery(
  //   {
  //     queryKey: ['me'],
  //     enabled: authStore.user === null,
  //     refetchOnWindowFocus: false,
  //   },
  //   apiQueryClient,
  // );

  // console.log('ME QUERY', meQuery);
  // console.log('ME QUERY 2', meQuery2);

  return {
    user: authStore.user,
    status: authStore.status,
    refresh: () => meQuery.refetch(),
    async signOut() {
      await signOutMutation.mutateAsync({
        body: null,
      });
    },
  };
};
