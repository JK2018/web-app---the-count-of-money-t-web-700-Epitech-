import {Controller, Get, HttpException, HttpStatus, Req, UseGuards} from '@nestjs/common';
import { DiscordGuard } from '../guards/discord.guard';
import {AuthService} from "../service/auth.service";
import {FacebookGuard} from "../guards/facebook.guard";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOkResponse({ description: 'Ask provider to login' })
    @Get(':provider')
    @UseGuards(DiscordGuard, FacebookGuard)
    async loginProvider() {
        return HttpStatus.OK;
    }

    @ApiOkResponse({ description: 'Login user from provider' })
    @Get(':provider/callback')
    @UseGuards(DiscordGuard, FacebookGuard)
    async loginProviderCallback(@Req() req) {
        return this.authService.login(req.user).catch(err => {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: err.message
            }, HttpStatus.BAD_REQUEST)
        });
    }
}
