import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, JwtPayloadWithRt } from '../types';
import { AuthService } from '../auth.service';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    config: ConfigService,
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('x-refresh'),
      secretOrKey: config.get<string>('RT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload): Promise<JwtPayloadWithRt> {
    // const refreshToken = req
    //   ?.get('authorization')
    //   ?.replace('Bearer', '')
    //   .trim();
    console.log('s1');

    const refreshToken = req.header('x-refresh');
    console.log(refreshToken);

    if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

    const tokens: any = await this.authService.createNewAccessToken(
      payload.sub,
      refreshToken,
    );
    console.log(tokens);

    return {
      ...payload,
      ...tokens,
    };
  }
}
