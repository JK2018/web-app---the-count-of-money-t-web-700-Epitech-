import {BadRequestException, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/service/user.service';
import { User } from '../../user/models/user.entity';
// import { Observable, from } from 'rxjs';
// import { User } from 'src/user/models/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {}

    async login(user: User) {
        const payload = { id: user.id, email: user.email, role: user.role };

        return {
            access_token: this.jwtService.sign(payload),
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

    async loginWithProvider(field: string, id: string, data?: any): Promise<any> {
        // const user = await this.userService.getUserWhere({ [field]: id });

        // if (!user) {
        //     user = await this.userService.createUserFromProvider(data);
        // }
        // console.log('user', user);
        return {
            test: 'test'
        };
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
