import { Crypto } from './../entities/crypto.entity';
import { UserService } from '../../user/service/user.service';
import { User } from '../../user/models/user.entity';
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
    return this.cryptosAvailable()
      .then((cryptosAvailable: []) => {
        if (cryptosAvailable.find((crypto: any) => crypto.id == createCryptoDto.cmid)) {
          return this.cryptoRepo.save(createCryptoDto);
        }
        else return Promise.reject({ message: "Cmid not know" })
      })
  }

  async findAll(user: User): Promise<any> {
    return Promise.all([this.userService.findOne(user.id), this.cryptoRepo.find()])
      .then(res => {
        user = res[0];
        const cryptos: Crypto[] = res[1];
        return Promise.all(cryptos.map((crypto: Crypto) => axios.get(`https://api.coingecko.com/api/v3/coins/${crypto.cmid}`)))
          .then((res: any) => {
            return cryptos.map((crypto: any, index) => this.formatDataCryptoGetAll(crypto, res[index].data, user.currency))
          })
      })
  }

  async findAllPublic(devise = "eur"): Promise<any> {
    return this.cryptoRepo.find({ default: true })
      .then((cryptos: Crypto[]) => {
        return Promise.all(cryptos.map((crypto: Crypto) => axios.get(`https://api.coingecko.com/api/v3/coins/${crypto.cmid}`)))
          .then((res: any) => {
            return cryptos.map((crypto: any, index) => this.formatDataCryptoGetAll(crypto, res[index].data, devise))
          })
      })
  }

  async findOne(id: number): Promise<any> {
    return this.cryptoRepo.findOne({ id }, { relations: ['users'] });
  }

  async findByCmId(user: User, cmid: string): Promise<any> {
    return Promise.all([this.userService.findOne(user.id), this.cryptoRepo.findOneOrFail({ where: { cmid }, relations: ['users'] })])
      .then(res => {
        user = res[0];
        const crypto: any = res[1];
        return axios.get(`https://api.coingecko.com/api/v3/coins/${crypto.cmid}`)
          .then((res: any) => this.formatDataCryptoById(crypto, res.data, user.currency))
      })
      .catch(() => Promise.reject({ message: "Cmid not know" }))
  }

  async findByCmIdPublic(cmid: string): Promise<any> {
    return this.cryptoRepo.findOneOrFail({ where: { cmid, default: true }, relations: ['users'] })
      .then((crypto: any) => {
        return axios.get(`https://api.coingecko.com/api/v3/coins/${crypto.cmid}`)
          .then((res: any) => this.formatDataCryptoById(crypto, res.data))
      })
      .catch(() => Promise.reject({ message: "Cmid not public or not know" }))
  }

  formatDataCryptoById(crypto: any, data: any, devise: string = "eur") {
    crypto.description = data.description["fr"];
    crypto.tag = data.symbol;
    crypto.rank = data.market_cap_rank;
    crypto.currentPrice = data.market_data.current_price[devise];
    crypto.lowestPrice = data.market_data.low_24h[devise];
    crypto.highestPrice = data.market_data.high_24h[devise];
    crypto.volume = data.market_data.total_volume[devise];
    crypto.marketCap = data.market_data.market_cap[devise];
    crypto.dayEvolution = data.market_data.price_change_24h_in_currency[devise];
    crypto.weekEvolution = data.market_data.price_change_percentage_7d_in_currency[devise];
    crypto.monthEvolution = data.market_data.price_change_percentage_30d_in_currency[devise];
    return crypto;
  }

  formatDataCryptoGetAll(crypto: any, data: any, devise: string = "eur") {
    crypto.tag = data.symbol;
    crypto.rank = data.market_cap_rank;
    crypto.currentPrice = data.market_data.current_price[devise];
    crypto.lowestPrice = data.market_data.low_24h[devise];
    crypto.highestPrice = data.market_data.high_24h[devise];
    crypto.marketCap = data.market_data.market_cap[devise];
    crypto.dayEvolutionPercentage = data.market_data.price_change_percentage_24h_in_currency[devise];
    crypto.dayEvolutionPrice = data.market_data.price_change_24h_in_currency[devise];
    return crypto;
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
            return res.data;
          })
      })
  }

  async getPublicHistory(cmid: string, periode: string): Promise<any> {
    return this.cryptoRepo.findOneOrFail({ where: { cmid, default: true }, relations: ['users'] })
      .then(() => axios.get(`https://api.coingecko.com/api/v3/coins/${cmid}/market_chart?vs_currency=eur&interval=${periode}&days=30`)
        .then(res => {
          return res.data;
        })
      )
      .catch(() => ({message: "Crypto not know or not public"}))
  }
}
