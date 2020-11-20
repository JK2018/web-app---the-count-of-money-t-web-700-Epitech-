import { HttpModule, Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants/constants';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../auth/guards/local.strategy';
import { JwtStrategy } from '../auth/guards/jwt.strategy';
import {AuthService} from "../auth/service/auth.service";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
      AuthModule,
      TypeOrmModule.forFeature([User]),
      // JwtModule.register({
      //     secret: jwtConstants.secret,
      //     signOptions: { expiresIn: '30d' }
      // }),
      HttpModule,
      // PassportModule,
  ],
  providers: [UserService, LocalStrategy, JwtStrategy],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
