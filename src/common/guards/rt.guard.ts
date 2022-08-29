import { ExecutionContext, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

export class RtGuard extends AuthGuard('jwt-refresh') {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest<Request>();

    const tokens = await this.authService.refreshTokens(
      // @ts-ignore
      req.user.sub,
      // @ts-ignore
      req.header('x-refresh'),
    );

    // @ts-ignore
    req.user.tokens = tokens;

    // @ts-ignore
    return req.user;

    // return super.canActivate(context);
  }
}
