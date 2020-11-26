import { Crypto } from './../entities/crypto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateCryptoDto } from '../dto/create-crypto.dto';
import { UpdateCryptoDto } from '../dto/update-crypto.dto';
import axios from 'axios';

@Injectable()
export class CryptoService {

  constructor(
    @InjectRepository(Crypto) private readonly cryptoRepo: Repository<Crypto>
  ) { }

  async create(createCryptoDto: CreateCryptoDto): Promise<any> {
    return this.cryptoRepo.save(createCryptoDto);
  }

  async findAll(): Promise<any> {
    return this.cryptoRepo.find()
    .then((cryptos : Crypto[]) => {
      return Promise.all(cryptos.map((crypto : Crypto) => axios.get(`https://api.coingecko.com/api/v3/coins/${crypto.cmid}`)))
      .then((res: any) => {
        return cryptos.map((crypto: any, index) => {
          crypto.currentPrice  = res[index].data.market_data.current_price.eur;
          return crypto;
        })
      })
    })
  }

  async findOne(id: number): Promise<any> {
    return this.cryptoRepo.findOne({ id }, { relations: ['users'] });
  }

  async findByCmId(cmid: string): Promise<any> {
    return this.cryptoRepo.findOneOrFail({ where: {cmid}, relations: ['users'] })
    .then((crypto: any) => {
      return axios.get(`https://api.coingecko.com/api/v3/coins/${crypto.cmid}`)
      .then((res: any) => {
        crypto.currentPrice  = res.data.market_data.current_price.eur;
        return crypto;
      })
    })
  }

  async update(id: number, updateCryptoDto: UpdateCryptoDto): Promise<any> {
    return this.cryptoRepo.update(id, updateCryptoDto);
  }

  async remove(id: number): Promise<any> {
    return this.cryptoRepo.delete(id);
  }

  async cryptosAvailable(): Promise<any> {
    return axios.get("https://api.coingecko.com/api/v3/coins/list")
      .then(response => response.data);
  }

  async currenciesAvailable(): Promise<any> {
    return axios.get("https://api.coingecko.com/api/v3/simple/supported_vs_currencies")
      .then(response => response.data);
  }

  async getHistory(cmid: string, nbDay: string): Promise<any> {
    return axios.get(`https://api.coingecko.com/api/v3/coins/${cmid}/market_chart?vs_currency=eur&days=${nbDay}`)
    .then(response => response.data);
  }
}
