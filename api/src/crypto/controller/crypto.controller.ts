import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { Crypto } from './../entities/crypto.entity';
import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
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
    return this.cryptoService.create(createCryptoDto);
  }

  @ApiOkResponse({ description: 'Get all cryptos' })
  // @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.cryptoService.findAll();
  }

  @ApiOkResponse({ description: 'Get crypto by id' })
  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.cryptoService.findOne(+id);
  }

  @ApiOkResponse({ description: 'Update crypto' })
  // @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCryptoDto: UpdateCryptoDto) {
    return this.cryptoService.update(+id, updateCryptoDto);
  }

  @ApiNoContentResponse({ description: 'Remove crypto' })
  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.cryptoService.remove(+id);
  }
}
