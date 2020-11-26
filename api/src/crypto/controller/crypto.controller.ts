import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Put, Req, UseGuards, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CryptoService } from '../service/crypto.service';
import { CreateCryptoDto } from '../dto/create-crypto.dto';
import { UpdateCryptoDto } from '../dto/update-crypto.dto';

@ApiTags('Crytpos')
@Controller('cryptos')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) { }

  @ApiCreatedResponse({ description: 'Create/register a new crypto' })
  // @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCryptoDto: CreateCryptoDto) {
    return this.cryptoService.create(createCryptoDto).catch(err => {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: err.message
      }, HttpStatus.BAD_REQUEST)
    });
  }

  @ApiOkResponse({ description: 'Get all cryptos' })
  // @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.cryptoService.findAll().catch(err => {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: err.message
      }, HttpStatus.BAD_REQUEST)
    });
  }

  @ApiOkResponse({ description: 'Get crypto by id' })
  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.cryptoService.findOne(+id).catch(err => {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: err.message
      }, HttpStatus.BAD_REQUEST)
    });
  }

  @ApiOkResponse({ description: 'Update crypto' })
  // @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCryptoDto: UpdateCryptoDto) {
    return this.cryptoService.update(+id, updateCryptoDto).catch(err => {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: err.message
      }, HttpStatus.BAD_REQUEST)
    });
  }

  @ApiNoContentResponse({ description: 'Remove crypto' })
  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.cryptoService.remove(+id).catch(err => {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: err.message
      }, HttpStatus.BAD_REQUEST)
    });
  }
}
