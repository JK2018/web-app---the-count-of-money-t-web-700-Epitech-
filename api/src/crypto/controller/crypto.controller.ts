import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CryptoService } from '../service/crypto.service';
import { CreateCryptoDto } from '../dto/create-crypto.dto';
import { UpdateCryptoDto } from '../dto/update-crypto.dto';

@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Post()
  create(@Body() createCryptoDto: CreateCryptoDto) {
    return this.cryptoService.create(createCryptoDto);
  }

  @Get()
  findAll() {
    return this.cryptoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cryptoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCryptoDto: UpdateCryptoDto) {
    return this.cryptoService.update(+id, updateCryptoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cryptoService.remove(+id);
  }
}
