import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.API_FIREBASE_PROJECT_ID,
    clientEmail: process.env.API_FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.API_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
});

export { admin };
