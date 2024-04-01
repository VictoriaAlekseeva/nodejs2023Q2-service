import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { UserService } from 'src/user/user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

const secret = process.env.SECRET;
const expireTime = process.env.TOKEN_EXPIRE_TIME

@Module({
  imports: [
    PrismaModule,
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: secret,
        signOptions: { expiresIn: expireTime },
      }),
    }),
    // JwtModule.register({
    //   secret: secret,
    //   signOptions: { expiresIn: expireTime },
    // }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }],
  exports: [AuthService],
})
export class AuthModule { }
