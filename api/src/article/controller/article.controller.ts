import { Controller, Get, HttpException, HttpStatus, Param, Req, UseGuards } from "@nestjs/common";
import { ArticleService } from '../service/article.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Article } from '../models/article.entity';
import { JwtAnonymousGuard } from '../../auth/guards/jwt-anonymous.guard';

@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiOkResponse({ description: 'Get all articles' })
  @UseGuards(JwtAnonymousGuard)
  @Get()
  async getArticles(@Req() { user }): Promise<Article[]> {
    try {
      return !user ?
        this.articleService.findAll() :
        this.articleService.findWithFilter(user.id);
    } catch (err) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: err.message
      }, HttpStatus.BAD_REQUEST)
    }
  }

  @ApiOkResponse({ description: 'Get article by id' })
  @Get('/:id')
  async getArticlebyId(@Param('id') id: string) {
    return id;
  }
}
