import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { type Request } from 'express';
import { admin } from '../firebase-admin.module';

export type ReqWithUser = Request & {
  user: {
    id: string;
    email: string;
  };
  token: string;
};

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ReqWithUser>();
    const sessionCookie = request.cookies['session'] as
      | string
      | undefined
      | null;
    if (!sessionCookie) {
      return false;
    }

    const decodedClaims = await admin
      .auth()
      .verifySessionCookie(sessionCookie, true);
    // this is make this work exclusively with email, but we can add more claims later
    // ex: phone authentication, for now we use email auth
    if (!decodedClaims.email) return true;

    // once verified we set property to request
    request.user = {
      email: decodedClaims.email,
      id: decodedClaims.dbUserId,
    };

    return true;
  }
}
