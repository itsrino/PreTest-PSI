import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  Req,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  async register(
    @Body()
    body: {
      username: string;
      password: string;
      email: string;
      telp: string;
    },
  ) {
    const user = await this.userService.createUser(
      body.username,
      body.password,
      body.email,
      body.telp,
    );
    return { message: 'User registered successfully', userId: user.id };
  }

  @HttpCode(200)
  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
    @Res() res: Response,
  ) {
    const user = await this.userService.validateUser(
      body.username,
      body.password,
    );
    return res.json(this.authService.setCookieToken(res, user));
  }

  @Get('profile')
  getProfile(@Req() req: Request) {
    const token = req.cookies['auth_token'];
    return token
      ? { message: 'Authenticated', token }
      : { message: 'Not authenticated' };
  }

  @Get('logout')
  logout(@Res() res: Response) {
    res.clearCookie('auth_token');
    return res.json({ message: 'Logged out successfully' });
  }
}
