import {BadRequestException, HttpService, Injectable} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { AuthService } from '../service/auth.service';
import {User} from "../../user/models/user.entity";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private httpService: HttpService,
        private readonly authService: AuthService
    ) {
        super({
            // authorizationURL: 'https://discord.com/api/oauth2/authorize',
            // tokenURL: 'https://discord.com/api/oauth2/token',
            clientID: '881210273408-ci6k9enalrmnhs8f1urpoesldadm8p5u.apps.googleusercontent.com',
            clientSecret: 'lc-cPcYi0EB_IrfzZOCNaJYm',
            callbackURL: 'http://localhost:3000/api/auth/google/callback',
            // scope: 'identify',
        });
    }

    async validate(accessToken: string): Promise<User> {
        return
    }
}