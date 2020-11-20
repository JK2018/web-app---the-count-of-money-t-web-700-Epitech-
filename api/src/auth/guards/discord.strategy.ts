import {BadRequestException, HttpService, Injectable} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { AuthService } from '../service/auth.service';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
    constructor(
        private httpService: HttpService,
        private readonly authService: AuthService
        ) {
        super({
            authorizationURL: 'https://discord.com/api/oauth2/authorize',
            tokenURL: 'https://discord.com/api/oauth2/token',
            clientID: '779290970318438420',
            clientSecret: 'XvZUB9EGBFHCtGuQHdhmDKP4PuB-PXRx',
            callbackURL: 'http://localhost:3000/api/auth/discord/callback',
            scope: 'identify',
        });
    }

    async validate(accessToken: string): Promise<any> {
        const { data } = await this.httpService.get('https://discord.com/api/users/@me', {
            headers: { Authorization: `Bearer ${ accessToken }` },
        }).toPromise();

        return this.authService.loginWithProvider('discord_id', data.id, data).catch(() => {
            new BadRequestException();
        })
    }
}