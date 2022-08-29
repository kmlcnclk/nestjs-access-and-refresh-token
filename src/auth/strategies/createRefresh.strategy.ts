import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, JwtPayloadWithRt } from '../types';
import { AuthService } from '../auth.service';

@Injectable()
export class CreateRefreshStrategy extends PassportStrategy(
  Strategy,
  'create_refresh',
) {
  constructor(
    config: ConfigService,
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('x-refresh'),
      secretOrKey: config.get<string>('RT_SECRET'),
      ignoreExpiration: true,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload): Promise<JwtPayloadWithRt> {
    console.log('sq');
    const refreshToken = req.header('x-refresh');
    console.log(refreshToken);

    if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

    const tokens: any = await this.authService.refreshTokens(
      payload.sub,
      refreshToken,
    );

    return {
      ...payload,
      ...tokens,
    };
  }
}
