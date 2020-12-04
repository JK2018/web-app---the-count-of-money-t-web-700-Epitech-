import { Controller, Get, HttpException, HttpStatus, Param } from "@nestjs/common";
import { ArticleService } from '../service/article.service';
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Article } from "../models/article.entity";

@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiOkResponse({ description: 'Get all articles' })
  @Get()
  async getArticles(): Promise<Article[]> {
    return this.articleService.findAll().catch(err => {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: err.message
      }, HttpStatus.BAD_REQUEST)
    });
  }

  @ApiOkResponse({ description: 'Get artcile by id' })
  @Get('/:id')
  async getArticlebyId(@Param('id') id: string) {
    return id;
  }
}
