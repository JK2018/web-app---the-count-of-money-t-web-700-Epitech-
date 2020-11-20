import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { DiscordGuard } from '../guards/discord.guard';

@Controller('auth')
export class AuthController {
    constructor() {}

    @Get(':provider')
    @UseGuards(DiscordGuard)
    async loginUserFromProvider(@Req() req) {
        console.log('/discord', req.user)
        return req.user;
    }

    @Get(':provider/callback')
    async providerLoginCallback(@Req() req) {
        console.log('/discord/callback', req);
    }
}
