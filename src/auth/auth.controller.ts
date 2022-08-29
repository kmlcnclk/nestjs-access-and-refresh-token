import { Get, Inject, Req } from '@nestjs/common';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { Public, GetCurrentUserId, GetCurrentUser } from '../common/decorators';
import { AtGuard, RtGuard } from '../common/guards';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';
import { JwtGuard } from '../common/guards/jwt.guard';
import { AGuard } from '../common/guards/a.guard';
import { BGuard } from '../common/guards/b.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE')
    private authService: AuthService,
  ) {}

  // @Public() //public varsa accesstoken istemeyecek demek public yoksa accesstoken isteyecek
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }

  // @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  }

  // black lit buaraya yazırlır kullanııc log out olduğunda mevcut accessler access db sine refreshler refresh dbsine kaydedilir ve olası bir durumda bu token ların çalınması durumunda bu tokenlar blacklistde olduğu için işlem yapılmaz tabi bunun içinde jwt guard gibi faklı bir guard lazımve bu garda access token ve ya refersh token black listde var mı diye kontrol edilmeli ve @UseGuards(BlackListGuard, JwtGuard) şeklinde yazılmalı bu şekilde yazarsan önce BlackListGuard girer ve hata varsa JwtGuard ' a girmez ama hata yoksa JwtGuard'a girer. yai access veya refresh black listde varsa JwtGuard' girmez.

  @Post('logout')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  profile(@Req() req) {
    return req.user;
  }

  @Get('adana')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AGuard, BGuard)
  adana(@Req() req) {
    return 'Adana';
  }

  // @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
