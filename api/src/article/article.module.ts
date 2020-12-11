import { Module } from '@nestjs/common';
import { ArticleService } from './service/article.service';
import { ArticleController } from './controller/article.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Article } from "./models/article.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Article])
  ],
  providers: [ArticleService],
  controllers: [ArticleController],
  exports: [ArticleService]
})
export class ArticleModule {}
