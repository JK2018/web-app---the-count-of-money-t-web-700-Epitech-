import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../service/auth.service';
import { User } from "../../user/models/user.entity";
import { Strategy, Profile } from "passport-discord";
import {CreateUserFromProviderDto} from "../../user/models/user.dto";

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
    constructor(
        private readonly authService: AuthService
        ) {
        super({
            clientID: process.env.DISCORD_APP_ID,
            clientSecret: process.env.DISCORD_APP_SECRET,
            callbackURL: 'http://localhost:3001/oauth-callback/discord',
            scope: ['identify', 'email'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<User> {
        const userProfile: CreateUserFromProviderDto = {
            providerId: profile.id,
            email: profile.email,
            username: profile.username,
        }

        return await this.authService.findOrCreate('discord_id', profile.id, userProfile);
    }
}