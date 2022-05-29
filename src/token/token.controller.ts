import { TokenService } from 'src/token/token.service';
import { Body, Controller, Put } from '@nestjs/common';
import { RefreshTokenDTO } from './dto/refreshtoken.dto';

@Controller('token')
export class TokenController {
    constructor(
        private tokenService: TokenService
    ) {}


    @Put('refresh')
    async refreshToken(@Body() data: RefreshTokenDTO) {
        return this.tokenService.refreshToken(data.oldToken);
    }
}
