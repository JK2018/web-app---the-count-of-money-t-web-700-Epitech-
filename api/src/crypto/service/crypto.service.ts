import { Crypto } from './../entities/crypto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateCryptoDto } from '../dto/create-crypto.dto';
import { UpdateCryptoDto } from '../dto/update-crypto.dto';

@Injectable()
export class CryptoService {

  constructor(
    @InjectRepository(Crypto) private readonly cryptoRepo: Repository<Crypto>
  ) { }

  async create(createCryptoDto: CreateCryptoDto) : Promise<any> {
    return this.cryptoRepo.save(createCryptoDto);
  }

  async findAll() : Promise<any> {
    return this.cryptoRepo.find();
  }

  async findOne(id: number) : Promise<any> {
    return this.cryptoRepo.findOne({id});
  }

  async update(id: number, updateCryptoDto: UpdateCryptoDto) : Promise<any> {
    return this.cryptoRepo.update(id, updateCryptoDto);
  }

  async remove(id: number) : Promise<any> {
    return this.cryptoRepo.delete(id);
  }
}
