import { Controller, Get, HttpException, HttpStatus, Param, Req, UseGuards } from "@nestjs/common";
import { ArticleService } from '../service/article.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Article } from '../models/article.entity';
import { JwtAnonymousGuard } from '../../auth/guards/jwt-anonymous.guard';
import { RBAcGuard, RBAcPermissions } from 'nestjs-rbac';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

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

  @ApiOkResponse({ description: 'Get artcile by id' })
  @Get('/:id')
  async getArticlebyId(@Param('id') id: string) {
    return id;
  }

  @ApiOkResponse({ description: 'Get press review list' })
  @RBAcPermissions('cryptos@delete')
  @UseGuards(JwtAuthGuard, RBAcGuard)
  @Get('/press/list')
  async getPressReviewList() {
    return [
      'https://cointelegraph.com/rss',
    ];
  }
}
