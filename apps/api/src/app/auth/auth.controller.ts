import { Body, Controller, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TsRestHandler } from '@ts-rest/nest';
import { contracts } from '@aero/api-client';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {
    this.logger.log('AuthController constructor');
  }

  @TsRestHandler(contracts.auth.login)
  async login(@Body() body: null) {
    // return this.authService.login(body);
  }
}
