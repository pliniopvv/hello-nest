import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entity/user.entity';
import { log } from 'src/utils/Utils.tools';
import { jwtConstants } from './Constants';
import { TokenService } from 'src/token/token.service';

const debug_tag = 'auth.service.ts';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private tokenService: TokenService) {
    }

    async validarUsuario(login: string, senha: string): Promise<any> {
        const usuario = await this.userService.findLogin(login);
        if (usuario && bcrypt.compareSync(senha, usuario.password)) {
            const { password, ...result } = usuario;
            return result;
        }
        return null;
    }

    async login(user: any) {
        log(0,debug_tag,'payload > ', user.login, user.id);
        const payload = { username: user.login, sub: user.id }
        const token = this.jwtService.sign(payload, { secret: jwtConstants.secret });
        await this.tokenService.save(token, user.login);
        return {
            access_token: token
        }
    }

}
