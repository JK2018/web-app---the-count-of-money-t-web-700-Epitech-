import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../models/article.entity';
import { Repository } from 'typeorm';
import { UserService } from "../../user/service/user.service";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private readonly articleRepo: Repository<Article>,
    private readonly userService: UserService
  ) {}

  async findAll(): Promise<Article[]> {
    return this.articleRepo.find();
  }

  async findWithFilter(userId: string): Promise<Article[]> {
    const user = await this.userService.findOne(userId);
    let articles = await this.articleRepo.find();

    if (!user) {
      throw new Error('Unknown user');
    }

    articles = articles.filter(article => {
      let i = 0;

      while (user.articleKeywords[i]) {
        if (article.summary.includes(user.articleKeywords[i]) || article.title.includes(user.articleKeywords[i])) {
          return true;
        }
        i++;
      }
    });

    return articles;
  }

  async deleteAll(): Promise<void> {
    return this.articleRepo.clear();
  }

  async saveAll(articles: Article[]): Promise<Article[]> {
    return this.articleRepo.save(articles);
  }
}
