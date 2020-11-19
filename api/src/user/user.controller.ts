import {Body, Controller, HttpException, HttpStatus, Post, Req, UseGuards} from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { User } from './user.entity';
import { UserService } from './user.service';
import {LocalAuthGuard} from "../auth/local-auth.guard";
// import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import UserDto from "./user.dto";

@Crud({
    model: {
        type: User,
    },
    // routes: {
    //     getManyBase?: {
    //         decorators?: [],
    //     },
    //     getOneBase?: {
    //         decorators?: [],
    //     },
    //     createOneBase?: {
    //         decorators?: [],
    //     },
    //     createManyBase?: {
    //         decorators?: [],
    //     },
    //     updateOneBase: {
    //         decorators?: [],
    //     },
    //     replaceOneBase: {
    //         decorators?: [],
    //     },
    //     deleteOneBase?: {
    //         decorators?: [],
    //     },
    // }
})
@Controller('users')
export class UserController {
    constructor(public service: UserService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req) {
        return this.service.login(req.user).catch(err => {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: err.message
            }, HttpStatus.BAD_REQUEST)
        });
    }

    @Post('register')
    async register(@Req() req, @Body() body: UserDto) {
        return this.service.createUser(body).catch(err => {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: err.message
            }, HttpStatus.BAD_REQUEST)
        });
    }
}
