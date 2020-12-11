import { HttpService, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ArticleService } from '../../article/service/article.service';
import { Article } from "../../article/models/article.entity";

@Injectable()
export class CronService {
  constructor(
    private readonly articleService: ArticleService,
    private readonly httpService: HttpService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    try {
      const { data } = await this.httpService.get('https://api.rss2json.com/v1/api.json?rss_url=https://cointelegraph.com/rss').toPromise();

      await this.articleService.deleteAll();

      const articles: Article[] = data.items.map((item) => ({
        title: item.title,
        date: item.pubDate,
        source: item.author,
        summary: item.description,
        urlArticle: item.link,
        urlImage: item.thumbnail,
      }));

      await this.articleService.saveAll(articles);
    } catch(err) {
      console.error(err);
    }
  }
}
