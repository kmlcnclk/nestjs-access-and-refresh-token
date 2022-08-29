import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { RtGuard } from './rt.guard';
import { RtStrategy } from '../../auth/strategies/rt.strategy';
import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
    private reflector: Reflector,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // const isPublic = this.reflector.getAllAndOverride('isPublic', [
    //   context.getHandler(),
    //   context.getClass(),
    // ]);

    // if (isPublic) return true;
    // const req = context.switchToHttp().getRequest<Request>();

    // const accessToken: any = req.header('Authorization')?.split(' ')[1];
    // const refreshToken = req.header('x-refresh');

    // const isValidAccessToken =
      // this.authService.validateAccessToken(accessToken);
    // console.log(isValidAccessToken);

    return super.canActivate(context);
  }

  // handleRequest(err, user, info) {
  //   // You can throw an exception based on either "info" or "err" arguments
  //   if (err || !user) {
  //     console.log('asdas');
  //     // const rts = new RtStrategy();

  //     // buraya nasıl guardı çağıracam onu bul
  //     // amacım şu access token ve refresh frontend den aynı anda gönderilir ve önde access tokena bakılır sonra
  //     // eğer bu geçersiz ise refresh tokena bakılır ve bu geçerli ise istek yapılır.
  //   }
  //   return user;
  // }
}
