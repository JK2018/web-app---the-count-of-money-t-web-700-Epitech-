import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from '../models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import {CreateUserDto, CreateUserFromProviderDto, UpdateUserDto} from '../models/user.dto';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
    ) {
        super(userRepo);
    }

    async getUserWhere(options?: {[key: string]: any}): Promise<User> {
        return this.userRepo.findOne(options);
    }

    async createUser(user: CreateUserDto) {
        const newUser = new User();

        newUser.email = user.email;
        newUser.password = user.password;
        newUser.first_name = user.firstName;
        newUser.last_name = user.lastName;
        newUser.username = user.username;

        return this.userRepo.save(newUser);
    }

    async createUserFromProvider(providerIdField: string, data: CreateUserFromProviderDto) {
        const user = new User();

        user[providerIdField] = data.providerId;
        user.email = data.email;
        user.first_name = data.firstName;
        user.last_name = data.lastName;
        user.username = data.username;

        return this.userRepo.save(user);
    }

    async updateUser(id: string | number, user: UpdateUserDto): Promise<UpdateResult> {
        const updatedUser = new User();

        updatedUser.first_name = user.firstName;
        updatedUser.last_name = user.lastName;
        updatedUser.username = user.username;

        return this.userRepo.update(id, updatedUser);
    }
}
