import * as admin from 'firebase-admin';
// const serviceAccount = require('config/aero-racehub-firebase-adminsdk-fbsvc-e5097a6339-latest.json');

// console.log('### PROCESS.ENV', process.env);

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.API_FIREBASE_PROJECT_ID,
    clientEmail: process.env.API_FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.API_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
  // credential: admin.credential.cert(serviceAccount),
  // projectId: 'aero-racehub',
});

export { admin };
