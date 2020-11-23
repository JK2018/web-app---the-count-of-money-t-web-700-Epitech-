import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { UserModule } from './user/user.module';
import { RBAcStorage } from './config/RBAcStorage';
import { RBAcModule } from 'nestjs-rbac';
import { CryptoModule } from './crypto/crypto.module';

@Module({
  imports: [
      TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
      RBAcModule.forRoot(RBAcStorage),
      UserModule,
      CryptoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

