import { BadRequestException, Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from '../models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, UpdateUserDto } from '../models/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        private jwtService: JwtService
    ) {
        super(userRepo);
    }

    async getUserWhere(options?: {[key: string]: any}): Promise<User> {
        return this.userRepo.findOneOrFail(options);
    }

    async createUser(user: CreateUserDto) {
        const newUser = new User();

        newUser.email = user.email;
        newUser.password = user.password;
        newUser.firstName = user.firstName;
        newUser.lastName = user.lastName;
        newUser.username = user.username;

        return this.userRepo.save(newUser);
    }

    async updateUser(id: string | number, user: UpdateUserDto): Promise<UpdateResult> {
        const updatedUser = new User();

        updatedUser.firstName = user.firstName;
        updatedUser.lastName = user.lastName;
        updatedUser.username = user.username;

        return this.userRepo.update(id, updatedUser);
    }

    async validateUser(email, password): Promise<any> {
        try {
            const user = await this.getUserWhere({where: {email}});
            const isRightPassword = await bcrypt.compare(password, user.password);

            if (isRightPassword)
                return user;
        } catch (e) {
            throw new BadRequestException();
        }
    }

    async login(user: User) {
        const payload = { id: user.id, email: user.email, role: user.role };

        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
