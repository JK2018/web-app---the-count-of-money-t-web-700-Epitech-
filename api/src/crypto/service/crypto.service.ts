import { UserService } from './../../user/service/user.service';
import { User } from './../../user/models/user.entity';
import { Crypto } from './../entities/crypto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateCryptoDto } from '../dto/create-crypto.dto';
import { UpdateCryptoDto } from '../dto/update-crypto.dto';
import axios from 'axios';

@Injectable()
export class CryptoService {

  constructor(
    @InjectRepository(Crypto) private readonly cryptoRepo: Repository<Crypto>,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) { }

  async create(createCryptoDto: CreateCryptoDto): Promise<any> {
    return this.cryptoRepo.save(createCryptoDto);
  }

  async findAll(user: User): Promise<any> {
    return Promise.all([this.userService.findOne(user.id), this.cryptoRepo.find()])
    .then(res => {
      user = res[0];
      let cryptos : Crypto[] = res[1];
      return Promise.all(cryptos.map((crypto : Crypto) => axios.get(`https://api.coingecko.com/api/v3/coins/${crypto.cmid}`)))
      .then((res: any) => {
        return cryptos.map((crypto: any, index) => {
          crypto.currentPrice  = res[index].data.market_data.current_price[user.currency];
          crypto.lowestPrice  = res[index].data.market_data.low_24h[user.currency];
          crypto.highestPrice  = res[index].data.market_data.high_24h[user.currency];
          return crypto;
        })
      })
    })
  }

  async findOne(id: number): Promise<any> {
    return this.cryptoRepo.findOne({ id }, { relations: ['users'] });
  }

  async findByCmId(user: User, cmid: string): Promise<any> {
    return Promise.all([this.userService.findOne(user.id), this.cryptoRepo.findOneOrFail({ where: {cmid}, relations: ['users'] })])
    .then(res => {
      user = res[0];
      let crypto: any = res[1];
      return axios.get(`https://api.coingecko.com/api/v3/coins/${crypto.cmid}`)
      .then((res: any) => {
        crypto.currentPrice  = res.data.market_data.current_price[user.currency];
        crypto.lowestPrice  = res.data.market_data.low_24h[user.currency];
        crypto.highestPrice  = res.data.market_data.high_24h[user.currency];
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

  async getHistory(user: User, cmid: string, periode: string): Promise<any> {
    return this.userService.findOne(user.id)
    .then(user => {
      return axios.get(`https://api.coingecko.com/api/v3/coins/${cmid}/market_chart?vs_currency=${user.currency}&interval=${periode}&days=30`)
      .then(res => {
        let history = res.data;
        return history;
      })
    })
  }
}
