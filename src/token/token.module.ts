import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';

@Module({
  imports: [UserModule, forwardRef(() => AuthModule)],
  providers: [TokenService, UserService, AuthService],
  exports: [TokenService],
  controllers: [TokenController]
})
export class TokenModule {}
