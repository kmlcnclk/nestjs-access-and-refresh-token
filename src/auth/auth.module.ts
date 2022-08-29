import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy, CreateRefreshStrategy } from './strategies';
import { AStrategy } from './strategies/a.strategy';
import { BStrategy } from './strategies/b.strategy';
import { CStrategy } from './strategies/c.strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    AtStrategy,
    RtStrategy,
    CreateRefreshStrategy,
    AStrategy,
    BStrategy,
    CStrategy,
  ],
})
export class AuthModule {}
