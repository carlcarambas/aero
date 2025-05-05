// !v1
// /**
//  * This is not a production server yet!
//  * This is only a minimal backend to get started.
//  */
// import { onRequest } from 'firebase-functions/v2/https';
// import express from 'express';
// import helmet from 'helmet';
// import { http } from '@google-cloud/functions-framework';
// import { Logger, VersioningType } from '@nestjs/common';
// import { ExpressAdapter } from '@nestjs/platform-express';
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app/app.module';
// import { isOnFirebaseFunctions } from './firebase/firebase.config';
// // import {
// //   beforeUserCreated,
// //   beforeUserSignedIn,
// // } from 'firebase-functions/v2/identity';

// async function bootstrap(expressInstance: express.Express) {
//   const app = await NestFactory.create(
//     AppModule,
//     new ExpressAdapter(expressInstance)
//   );

//   app.enableVersioning({
//     type: VersioningType.URI,
//   });

//   app.use(helmet());
//   app.enableCors({
//     origin: function (origin, callback) {
//       callback(null, origin);
//     },
//     // credentials: true,
//     optionsSuccessStatus: 200,
//   });

//   // const port = process.env.PORT || 3333;
//   // await app.listen(port);
//   // Logger.log(
//   //   // `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
//   //   `🚀 Application is running on: http://localhost:${port}`
//   // );

//   return app.init();
// }

// const server = express();
// bootstrap(server)
//   .then((app) => {
//     const port = process.env.PORT || 3333;
//     app.listen(port, () => {
//       Logger.log(
//         // `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
//         `🚀 Application is running on: http://localhost:${port}`
//       );
//     });
//   })
//   .catch((err) => Logger.error('Nest failed to start', err));

// if (isOnFirebaseFunctions()) {
//   http('api', server);
//   Logger.log(`🚀 Starting firebase functions at api`);
// }

// // Export the Firebase Cloud Function
// export const api = onRequest(
//   {
//     memory: '1GiB',
//     region: 'australia-southeast1',
//     minInstances: 1,
//   },
//   server
// );

//! V2

// export const onBeforeUserSignedIn = beforeUserSignedIn(event => {
//   console.log('onBeforeUserSignedIn', event.data);
// })

// export const onBeforeUserCreated = beforeUserCreated((event) => {
//   console.log('onBeforeUserCreated', event.data);
// });
// .runWith({
//   memory: '1GB',
//   timeoutSeconds: 60,
// })
// .https.onRequest(async (req, res) => {
//   await bootstrap(server);
//   server(req, res);
// });

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app/app.module';

// async function bootstrap() {
//   if (process.env.FIREBASE_CONFIG === undefined) {
//     const app = await NestFactory.create(AppModule);
//     app.enableCors();
//     const port = process.env.PORT || 3333;
//     await app.listen(port);
//     console.log(`Application is running on: http://localhost:${port}`);
//   }
// }
// bootstrap();

import { http } from '@google-cloud/functions-framework';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import { onRequest } from 'firebase-functions/v2/https';
import { AppModule } from './app/app.module';
import { ROOT_MODULE_CONFIG, rootModuleConfig } from './app/root.config';

const rootConfig = rootModuleConfig();
const hostOnFirebaseFunctions =
  rootConfig[ROOT_MODULE_CONFIG.RUN_ON_FIREBASE_FUNCTIONS];
const environment = rootConfig[ROOT_MODULE_CONFIG.ENVIRONMENT];

async function bootstrap(expressInstance: express.Express) {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance)
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(cookieParser());
  app.use(helmet());
  app.enableCors({
    // origin: function (origin, callback) {
    //   if (!origin) return callback(null, true);

    //   callback(null, origin);
    // },
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200', '*'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
    ],
    exposedHeaders: ['Authorization'], // Important for credentials
    optionsSuccessStatus: 200,
    maxAge: 86400,
  });

  return app.init();
}

const server = express();

// middleware for firebase functions
server.use((req, res, next) => {
  // const origin = req.headers.origin;
  // if (origin && ['http://localhost:4200'].includes(origin)) {
  //   res.setHeader('Access-Control-Allow-Origin', origin);
  // }
  // if (req.method === 'OPTIONS') {
  //   res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  //   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  //   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  //   res.header('Access-Control-Allow-Credentials', 'true');
  //   res.status(200).end();
  //   return;
  // }
  next();
});

bootstrap(server).then((app) => {
  // if (hostOnFirebaseFunctions) {
  Logger.log(`🚀 Starting firebase functions`);
  // }

  // else {
  //   const port = process.env.PORT || 3333;
  //   app.listen(port);
  //   Logger.log(`🚀 Application is running on: http://localhost:${port}`);
  // }
});

// if (hostOnFirebaseFunctions) {
// http('api', server);
Logger.log(`🚀 Starting firebase functions at api`);
// }

// For local development
// if (process.env.NODE_ENV !== 'production') {
//   expressServer.then(() => {
//     const port = process.env.PORT || 3333;
//     server.listen(port, () => {
//       Logger.log(`🚀 Application is running on: http://localhost:${port}`);
//     });
//   });
// }

// Export Firebase Function
export const api = onRequest(
  {
    minInstances: 1,
    memory: '1GiB',
  },
  server
);
