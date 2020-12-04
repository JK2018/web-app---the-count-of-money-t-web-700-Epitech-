import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../models/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private readonly articleRepo: Repository<Article>
  ) {}

  async findAll(): Promise<Article[]> {
    return this.articleRepo.find();
  }

  async deleteAll(): Promise<void> {
    return this.articleRepo.clear();
  }

  async saveAll(articles: Article[]): Promise<Article[]> {
    return this.articleRepo.save(articles);
  }
}
