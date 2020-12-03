import { Crypto } from './../../crypto/entities/crypto.entity';
import { CryptoService } from './../../crypto/service/crypto.service';
import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from '../models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto, CreateUserFromProviderDto, UpdateUserDto } from '../models/user.dto';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        private cryptoService: CryptoService
    ) {
        super(userRepo);
    }

    async getUserWhere(options?: {[key: string]: any}): Promise<User> {
        return this.userRepo.findOne(options);
    }

    async getUser(id: number): Promise<User> {
        return this.userRepo.findOne({id}, {relations: ['cryptos']});
    }

    async createUser(user: CreateUserDto) {
        const newUser = new User();

        newUser.email = user.email;
        newUser.password = user.password;
        newUser.firstName = user.firstName;
        newUser.lastName = user.lastName;
        newUser.username = user.username;
        newUser.currency = user.currency;

        return this.userRepo.save(newUser);
    }

    async createUserFromProvider(providerIdField: string, data: CreateUserFromProviderDto) {
        const user = new User();

        user[providerIdField] = data.providerId;
        user.email = data.email;
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.username = data.username;
        user.currency = "eur";

        return this.userRepo.save(user);
    }

    async updateUser(id: string | number, user: UpdateUserDto): Promise<UpdateResult> {
        const updatedUser = new User();

        updatedUser.firstName = user.firstName;
        updatedUser.lastName = user.lastName;
        updatedUser.username = user.username;

        return this.userRepo.update(id, updatedUser);
    }

    async addCrypto(user: User, id: number) {
        return Promise.all([this.getUser(user.id), this.cryptoService.findOne(id)])
        .then(res => {
            let newUser : User = res[0];
            let crypto : Crypto = res[1];
            newUser.cryptos.push(crypto);
            return this.userRepo.save(newUser);
        })
    }

    async removeCrypto(user: User, cryptoId: number) {
        return this.getUser(user.id)
        .then(newUser => {
            newUser.cryptos = newUser.cryptos.filter((crypto : Crypto) => crypto.id != cryptoId);
            return this.userRepo.save(newUser);
        })
    }
}
