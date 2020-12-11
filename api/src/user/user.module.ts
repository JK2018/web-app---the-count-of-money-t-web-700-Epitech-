import { UserService } from './service/user.service';
import { CryptoModule } from '../crypto/crypto.module';
import { HttpModule, Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { LocalStrategy } from '../auth/guards/local.strategy';
import { JwtStrategy } from '../auth/guards/jwt.strategy';
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
      AuthModule,
      TypeOrmModule.forFeature([User]),
      HttpModule,
      CryptoModule
  ],
  providers: [UserService, LocalStrategy, JwtStrategy],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
