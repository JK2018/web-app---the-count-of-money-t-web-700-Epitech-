import {BadRequestException, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/service/user.service';
import { User } from '../../user/models/user.entity';
// import { Observable, from } from 'rxjs';
// import { User } from 'src/user/models/user.interface';
import * as bcrypt from 'bcrypt';
import {CreateUserFromProviderDto} from "../../user/models/user.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {}

    // async loginFromProvider(user: User) {
    //     const payload = { id: user.id, role: user.role }
    //
    //     return {
    //         access_token: this.jwtService.sign(payload)
    //     }
    // }

    async login(user: User) {
        const payload = { id: user.id, email: user.email, role: user.role };

        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async validateUser(email, password): Promise<User> {
        try {
            const user = await this.userService.getUserWhere({where: {email}});
            const isRightPassword = await bcrypt.compare(password, user.password);

            if (isRightPassword)
                return user;
        } catch (e) {
            throw new BadRequestException();
        }
    }

    async findOrCreate(providerIdField: string, id: string, data?: CreateUserFromProviderDto): Promise<User> {
        try {
            let user = await this.userService.getUserWhere({ [providerIdField]: id });

            if (!user) {
                user = await this.userService.createUserFromProvider(providerIdField, data);
            }

            return user;
        } catch (err) {
            console.log(err);
            throw new BadRequestException();
        }
    }

    // generateJWT(user: User): Observable <string> {
    //     return from(this.jwtService.signAsync({user}));
    // }

    // hashPassword(password: string): Observable <string> {
    //     return from<string>(bcrypt.hash(password, 12));
    // }

    // comparePasswords(newPassword: string, passwortHash: string): Observable<any>{
    //     return from(bcrypt.compare(newPassword, passwortHash));
    // }
}
