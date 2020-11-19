import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../auth/constants";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "../auth/local.strategy";
import { JwtStrategy } from "../auth/jwt.strategy";

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
