import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterUserDto, LoginUserDto } from './dtos/users.dtos';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() payload: RegisterUserDto) {
    return this.authService.register(payload);
  }

  @Post('login')
  login(@Body() payload: LoginUserDto) {
    return this.authService.login(payload);
  }
}