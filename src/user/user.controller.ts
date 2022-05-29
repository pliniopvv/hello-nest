import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { User } from './entity/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from './user.service';
import { UserCadastrarDto } from './dto/user.cadastrar.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {

    constructor(private readonly usuarioService: UserService,
        private authService: AuthService) { }

    @UseGuards(JwtAuthGuard)
    @Get('listar')
    async listar(): Promise<User[]> {
        return this.usuarioService.findAll()
    }

    @Post('cadastrar')
    async cadastrar(@Body() data: UserCadastrarDto): Promise<User> {
        let user = await this.usuarioService.create(data);
        user.password = undefined;
        return user;
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    // @Post('login-token')
    // async loginToken(@Request() req, @Body() data) {
    //     return this.authService.loginToken(data.token);
    // }

}
