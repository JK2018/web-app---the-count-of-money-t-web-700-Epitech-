import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import { LocalStrategy } from './guards/local.strategy';
import { JwtStrategy } from './guards/jwt.strategy';
import { AuthService } from './service/auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controller/auth.controller';
import { DiscordStrategy } from './guards/discord.strategy';
import { FacebookStrategy } from './guards/facebook.strategy';

@Module({
    imports: [
        forwardRef(() => UserModule),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '30d' }
        }),
        PassportModule,
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        DiscordStrategy,
        FacebookStrategy
    ],
    exports: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
