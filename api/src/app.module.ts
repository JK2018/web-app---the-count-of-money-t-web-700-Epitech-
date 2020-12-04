import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { UserModule } from './user/user.module';
import { CryptoModule } from './crypto/crypto.module';
import { RBAcStorage } from './config/RBAcStorage';
import { RBAcModule } from 'nestjs-rbac';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [
      TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
      RBAcModule.forRoot(RBAcStorage),
      ScheduleModule.forRoot(),
      AuthModule,
      UserModule,
      CryptoModule,
      ArticleModule,
      CronModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

