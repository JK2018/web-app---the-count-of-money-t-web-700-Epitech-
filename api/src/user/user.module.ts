import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../auth/guards/local.strategy';
import { JwtStrategy } from '../auth/guards/jwt.strategy';

@Module({
  imports: [
      TypeOrmModule.forFeature([User]),
      JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '30d' }
      }),
      PassportModule,
  ],
  providers: [UserService, LocalStrategy, JwtStrategy],
  controllers: [UserController]
})
export class UserModule {}
