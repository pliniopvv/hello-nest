import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AppDataSource } from 'src/db/data-source';
import { UserService } from 'src/user/user.service';
import { Token } from './entity/token.entity';

@Injectable()
export class TokenService {
  private dataSource = AppDataSource;

  constructor(
      private userService: UserService,
      @Inject(forwardRef(() => AuthService))
      private authService: AuthService
  ) {}

    async save(hash: string, username: string) {
        let objToken = await this.dataSource.getRepository(Token).findOneBy({ username });
        if (objToken) {
            this.dataSource.getRepository(Token).update(objToken.id, {
                hash
            });
        } else {
            this.dataSource.getRepository(Token).insert({
                hash,
                username
            });
        }
    }

    async refreshToken(oldToken) {
        let objToken = await this.dataSource.getRepository(Token).findOneBy({ hash: oldToken })
        if (objToken) {
            let usuario = await this.userService.findLogin(objToken.username);
            return this.authService.login(usuario);
        } else {
            return new HttpException({
                errorMessage: `Token inválido`
            }, HttpStatus.UNAUTHORIZED);
        }
    }
}
