import { ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import { UpdateAuthDto } from './dto/updateAuth.dto';

interface Payload {
  userId: string,
  login: string
}

@Injectable()
export class AuthService {

  saltOrRounds: number = +process.env.CRYPT_SALT;

  constructor(
    private db: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  private async createTokens(payload: Payload) {
    const accessToken = await this.jwtService.signAsync(
      payload,
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME
      });

    const refreshToken = await this.jwtService.signAsync(
      payload,
      {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME
      })

    return {
      accessToken,
      refreshToken
    };
  }

  async login(login: string, password: string) {
    const user = await this.db.user.findUnique({ where: { login } })

    if (!user) throw new HttpException('User not found', HttpStatus.FORBIDDEN)

    const isMatch = await bcrypt.compare(password, user?.password);

    if (!isMatch) {
      throw new HttpException("Password doesn't match", HttpStatus.FORBIDDEN);
    }

    const payload = { userId: user.id, login: user.login };

    const userTokens = await this.createTokens(payload);

    return {
      ...payload,
      ...userTokens,
    };
  }

  async signup(login: string, password: string) {
    const hashPass = await bcrypt.hash(password, this.saltOrRounds);
    const user = await this.userService.create({ login: login, password: hashPass });

    return user;
  }

  async refresh({refreshToken}: UpdateAuthDto) {

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    try {
      const refreshTokenInfo = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      const userInfo = {
        userId: refreshTokenInfo.userId,
        login: refreshTokenInfo.login
      }

      const userTokens = await this.createTokens(userInfo);

      return userTokens;

    } catch (error) {
      throw new HttpException("Refresh token has expired", HttpStatus.FORBIDDEN);
    }

  }
}
