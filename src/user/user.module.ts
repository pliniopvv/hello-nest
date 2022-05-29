import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from './../auth/auth.service';
import { TokenService } from 'src/token/token.service';

@Module({
  providers: [UserService, AuthService, JwtService, TokenService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
