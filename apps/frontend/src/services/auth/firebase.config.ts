import axios from 'axios';
import { getAnalytics } from 'firebase/analytics';
import { FirebaseOptions, initializeApp, getApps, getApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import {
  connectFirestoreEmulator,
  getFirestore,
  initializeFirestore,
} from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

console.log('FIREBASE CONFIG', firebaseConfig, {
  PROENV: import.meta.env,
});

export const firebaseApp =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
initializeFirestore(firebaseApp, { ignoreUndefinedProperties: true });
export const firebaseFirestore = getFirestore(firebaseApp);
export const firebaseFunctions = getFunctions(
  firebaseApp,
  'australia-southeast1'
);
export const firebaseStorage = getStorage(firebaseApp);
export const firebaseAnalytics = getAnalytics(firebaseApp);

// if (import.meta.env.VITE_USE_FIREBASE_EMULATORS) {
if (import.meta.env.VITE_USE_FIREBASE_EMULATORS === false) {
  connectAuthEmulator(firebaseAuth, 'http://localhost:9099');
  connectFirestoreEmulator(firebaseFirestore, 'localhost', 8081);
  connectFunctionsEmulator(firebaseFunctions, 'localhost', 5001);
  connectStorageEmulator(firebaseStorage, 'localhost', 9199);
}

// set the API basepath using the firebase functions URL
if (import.meta.env.VITE_HOST_API_ON_FIREBASE) {
  type firebaseFunctionsWithUrl = typeof firebaseFunctions & {
    _url?(name: string): string;
  };
  axios.defaults.baseURL = (
    firebaseFunctions as firebaseFunctionsWithUrl
  )._url?.('api');
}
