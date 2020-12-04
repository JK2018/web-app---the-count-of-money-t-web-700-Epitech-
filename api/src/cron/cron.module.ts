import { HttpModule, Module } from '@nestjs/common';
import { CronService } from './service/cron.service';
import { ArticleModule } from '../article/article.module';

@Module({
  imports: [
    ArticleModule,
    HttpModule
  ],
  providers: [CronService],
  exports: [CronService]
})
export class CronModule {}
