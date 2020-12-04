import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Put, Req, UseGuards, Param, Delete, Patch, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CryptoService } from '../service/crypto.service';
import { CreateCryptoDto } from '../dto/create-crypto.dto';
import { UpdateCryptoDto } from '../dto/update-crypto.dto';

@ApiTags('Crytpos')
@Controller('cryptos')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) { }

  @ApiOkResponse({ description: 'Get all cryptos available' })
  // @UseGuards(JwtAuthGuard)
  @Get("available")
  async availables() {
    return this.cryptoService.cryptosAvailable().catch(err => {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: err.message
      }, HttpStatus.BAD_REQUEST)
    });
  }

  @ApiOkResponse({ description: 'Get all cryptos available' })
  // @UseGuards(JwtAuthGuard)
  @Get("currencies")
  async currencies() {
    return this.cryptoService.currenciesAvailable().catch(err => {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: err.message
      }, HttpStatus.BAD_REQUEST)
    });
  }

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

  @ApiOkResponse({ description: 'Get all cryptos publix' })
  @Get("public")
  async findAllPublic(@Query() { devis }) {
    return this.cryptoService.findAllPublic(devis).catch(err => {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: err.message
      }, HttpStatus.BAD_REQUEST)
    });
  }

  @ApiOkResponse({ description: 'Get all cryptos' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() { user }) {
    return this.cryptoService.findAll(user).catch(err => {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: err.message
      }, HttpStatus.BAD_REQUEST)
    });
  }

  @ApiOkResponse({ description: 'Get all cryptos available' })
  @UseGuards(JwtAuthGuard)
  @Get(":cmid/history/:periode")
  async history(@Req() { user }, @Param('cmid') cmid: string, @Param('periode') periode: string) {
    return this.cryptoService.getHistory(user, cmid, periode).catch(err => {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: err.message
      }, HttpStatus.BAD_REQUEST)
    });
  }


  @ApiOkResponse({ description: 'Get crypto by cmid' })
  @UseGuards(JwtAuthGuard)
  @Get(':cmid')
  async findOne(@Req() { user }, @Param('cmid') cmid: string) {
    return this.cryptoService.findByCmId(user, cmid).catch(err => {
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
