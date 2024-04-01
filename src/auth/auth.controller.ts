import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Public } from './routes';
import { UpdateAuthDto } from './dto/updateAuth.dto';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() authDto: AuthDto) {
    const { login, password } = authDto;

    return await this.authService.signup(login, password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() authDto: AuthDto) {
    const { login, password } = authDto;
    return await this.authService.login(login, password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.refresh(updateAuthDto);
  }
}
