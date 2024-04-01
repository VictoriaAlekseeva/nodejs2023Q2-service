import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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

  // @HttpCode(HttpStatus.OK)
  // @Post('refresh')
  // async refresh(@Body() authDto: AuthDto) {
  //   const { login, password } = authDto;
  //   return this.authService.refresh(login, password);
  // }
}


// Signup (auth/signup route)
// POST auth/signup - send login and password to create a new user
// Server should answer with status code 201 and corresponding message if dto is valid
// Server should answer with status code 400 and corresponding message if dto is invalid (no login or password, or they are not a strings)

// Login (auth/login route)
// POST auth/login - send login and password to get Access token and Refresh token (optionally)
// Server should answer with status code 200 and tokens if dto is valid
// Server should answer with status code 400 and corresponding message if dto is invalid (no login or password, or they are not a strings)
// Server should answer with status code 403 and corresponding message if authentication failed (no user with such login, password doesn't match actual one, etc.)

// Refresh (auth/refresh route)
// POST auth/refresh - send refresh token in body as { refreshToken } to get new pair of Access token and Refresh token
// Server should answer with status code 200 and tokens in body if dto is valid
// Server should answer with status code 401 and corresponding message if dto is invalid (no refreshToken in body)
// Server should answer with status code 403 and corresponding message if authentication failed (Refresh token is invalid or expired)