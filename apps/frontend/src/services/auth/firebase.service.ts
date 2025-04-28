import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  AuthError,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import { firebaseApp } from './firebase.config';

export const useSignInWithEmailAndPasswordMutation = (
  options?: UseMutationOptions<
    UserCredential,
    AuthError,
    { email: string; password: string }
  >
) =>
  useMutation<UserCredential, AuthError, { email: string; password: string }>({
    mutationFn: (props) =>
      signInWithEmailAndPassword(getAuth(), props.email, props.password),
    ...options,
  });

export const signInWithGoogle = (): ReturnType<typeof signInWithPopup> => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(getAuth(firebaseApp), provider);
};
