import { Injectable } from '@nestjs/common';
import { CreateCryptoDto } from '../dto/create-crypto.dto';
import { UpdateCryptoDto } from '../dto/update-crypto.dto';

@Injectable()
export class CryptoService {
  create(createCryptoDto: CreateCryptoDto) {
    return 'This action adds a new crypto';
  }

  findAll() {
    return `This action returns all crypto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} crypto`;
  }

  update(id: number, updateCryptoDto: UpdateCryptoDto) {
    return `This action updates a #${id} crypto`;
  }

  remove(id: number) {
    return `This action removes a #${id} crypto`;
  }
}
