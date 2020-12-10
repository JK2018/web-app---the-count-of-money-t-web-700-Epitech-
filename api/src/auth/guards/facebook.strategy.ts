import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { AuthService } from '../service/auth.service';
import { CreateUserFromProviderDto } from '../../user/models/user.dto';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor(private readonly authService: AuthService) {
        super({
            passReqToCallback: false,
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: 'http://localhost:3000/api/users/auth/facebook/callback',
            scope: 'email',
            profileFields: ['id', 'emails', 'name'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<any> {
        const { name, emails } = profile;
        const userProfile: CreateUserFromProviderDto = {
            providerId: profile.id,
            firstName: name.givenName,
            lastName: name.familyName,
            email: emails && emails[0].value,
            username: `${name.givenName} ${name.familyName}`
        }

        return await this.authService.findOrCreate('facebook_id', profile.id, userProfile);
    }
}