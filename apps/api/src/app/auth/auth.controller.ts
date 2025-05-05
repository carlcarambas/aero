import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { TsRestException, tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { contracts } from '@aero/api-client';
import { type Response, type Request } from 'express';
import { FirebaseAuthGuard, ReqWithUser } from './guards/firebase-auth.guard';

@Controller()
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {
    this.logger.log('AuthController constructor');
  }

  @TsRestHandler(contracts.auth.login)
  public async login(@Res({ passthrough: true }) res: Response) {
    return tsRestHandler(contracts.auth.login, async ({ headers }) => {
      const accessToken = headers.authorization.replace('Bearer ', '');

      console.log('#### accessToken', accessToken);

      try {
        const { userInfo } = await this.authService.verifyAndUpsertUser(
          accessToken
        );

        console.log('#### userInfo', userInfo);

        // create session token with firebase
        const { sessionCookie, expiresIn } =
          await this.authService.createSessionCookie(accessToken);
        console.log('#### sessionCookie', sessionCookie);

        res.cookie('session', sessionCookie, {
          httpOnly: true,
          secure: true,
          maxAge: expiresIn,
          sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        });

        return {
          status: HttpStatus.OK,
          body: userInfo,
        };
      } catch (error) {
        if (error instanceof Error) {
          console.log('#### API ERROR ', error);
          return {
            status: HttpStatus.UNAUTHORIZED,
            body: {
              message: "You're not authorized to access this resource",
            },
          };
        }

        this.logger.error(error);
        return {
          status: 500,
          body: {
            message: 'Internal server error',
          },
        };
      }
    });
  }

  @TsRestHandler(contracts.auth.me)
  @UseGuards(FirebaseAuthGuard)
  public async me(@Req() req: ReqWithUser) {
    return tsRestHandler(contracts.auth.me, async () => {
      try {
        return {
          status: HttpStatus.OK,
          body: await this.authService.getUserInfo(req.user.email),
        };
      } catch (error) {
        if (error instanceof TsRestException) throw error;
        this.logger.error(`Error at /me: ${error}`);
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          body: {
            message: 'Internal server error',
          },
        };
      }
    });
  }
  @TsRestHandler(contracts.auth.logout)
  @UseGuards(FirebaseAuthGuard)
  public async logout(
    @Req() req: ReqWithUser,
    @Res({ passthrough: true }) res: Response
  ) {
    return tsRestHandler(contracts.auth.logout, async () => {
      try {
        await this.authService.revokeToken(req.cookies.session);
        res.clearCookie('session');
        return {
          status: HttpStatus.OK,
          body: null,
        };
      } catch (error) {
        if (error instanceof TsRestException) throw error;
        this.logger.error(`Error at /logout: ${error}`);
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          body: {
            message: 'Internal server error',
          },
        };
      }
    });
  }
}
