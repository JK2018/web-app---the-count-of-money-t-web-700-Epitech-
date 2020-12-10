import { Crypto } from "../../crypto/entities/crypto.entity";
import { CryptoService } from "../../crypto/service/crypto.service";
import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { User } from "../models/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto, CreateUserFromProviderDto, UpdateUserDto } from "../models/user.dto";

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
        return this.userRepo.findOne(id);
    }

    async createUser(user: CreateUserDto) {
        if (!user.password) {
            throw new Error('Password is missing');
        }

        const newUser = new User();

        newUser.email = user.email;
        newUser.password = user.password;
        newUser.firstName = user.firstName;
        newUser.lastName = user.lastName;
        newUser.username = user.username;
        newUser.currency = user.currency;
        // newUser.role = UserRole.ADMIN;

        return this.userRepo.save(newUser);
    }

    async createUserFromProvider(providerIdField: string, data: CreateUserFromProviderDto) {
        const user = new User();

        user[providerIdField] = data.providerId;
        user.email = data.email;
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.username = data.username;

        return this.userRepo.save(user);
    }

    async updateUser(id: string | number, data: UpdateUserDto): Promise<User> {
        const user = await this.userRepo.findOne(id);

        user.email = data.email;
        user.cryptos = data.cryptos;
        user.articleKeywords = data.articleKeywords;
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.username = data.username;
        user.currency = data.currency;

        return this.userRepo.save(user);
    }

    async addCrypto(user: User, id: number) {
        return Promise.all([this.getUser(user.id), this.cryptoService.findOne(id)])
        .then(res => {
            const newUser : User = res[0];
            const crypto : Crypto = res[1];
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
