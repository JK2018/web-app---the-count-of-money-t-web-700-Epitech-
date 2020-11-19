import { BadRequestException, Injectable} from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import UserDto from "./user.dto";

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

    async createUser(user: UserDto) {
        const newUser = new User();

        newUser.email = user.email;
        newUser.password = user.password;
        newUser.firstName = user.firstName;
        newUser.lastName = user.lastName;
        newUser.username = user.username;

        return this.userRepo.save(newUser);
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
