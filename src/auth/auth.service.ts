import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

@Injectable()
export class AuthService {

    constructor(private userService: UserService) {
    }

    async validarUsuario(login: string, senha: string): Promise<any> {
        const usuario = await this.userService.findLogin(login);
        if (usuario && bcrypt.compareSync(senha, usuario.password)) {
            const { password, ...result } = usuario;
            return result;
        }
        return null;
    }

}
