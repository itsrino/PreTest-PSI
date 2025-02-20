import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateToken(user: User) {
    return this.jwtService.sign({
      id: user.id,
      username: user.username,
    });
  }

  setCookieToken(res: Response, user: User) {
    const token = this.generateToken(user);

    const decodedToken = this.jwtService.decode(token) as {
      iat: number;
      exp: number;
    };

    res.cookie('auth_token', token, { httpOnly: true, secure: false });
    return {
      message: 'Login successful',
      token,
      session_exp: decodedToken.exp,
      session_iat: decodedToken.iat,
    };
  }
}
