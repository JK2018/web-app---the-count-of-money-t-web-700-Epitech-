import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Post,
    Put,
    Req,
    UseGuards,
    Delete,
    Param,
    UnauthorizedException, ClassSerializerInterceptor, UseInterceptors
} from "@nestjs/common";
// import { Crud } from '@nestjsx/crud';
// import { User } from '../models/user.entity';
import { UserService } from '../service/user.service';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateUserDto, UpdateUserDto } from '../models/user.dto';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../../auth/service/auth.service';
import { JwtAnonymousGuard } from "../../auth/guards/jwt-anonymous.guard";
import { DiscordGuard } from "../../auth/guards/discord.guard";
import { FacebookGuard } from "../../auth/guards/facebook.guard";

@ApiTags('Users')
// @Crud({
//     model: {
//         type: User,
//     },
//     // routes: {
//     //     getManyBase?: {
//     //         decorators?: [],
//     //     },
//     //     getOneBase?: {
//     //         decorators?: [],
//     //     },
//     //     createOneBase?: {
//     //         decorators?: [],
//     //     },
//     //     createManyBase?: {
//     //         decorators?: [],
//     //     },
//     //     updateOneBase: {
//     //         decorators?: [],
//     //     },
//     //     replaceOneBase: {
//     //         decorators?: [],
//     //     },
//     //     deleteOneBase?: {
//     //         decorators?: [],
//     //     },
//     // }
// })
@Controller('users')
export class UserController {
    constructor(
        public service: UserService,
        private readonly authService: AuthService
    ) {}

    @ApiOkResponse({ description: 'Ask provider to login' })
    @Get('auth/:provider')
    @UseGuards(DiscordGuard, FacebookGuard)
    async loginProvider() {
        return HttpStatus.OK;
    }

    @ApiOkResponse({ description: 'Login user from provider' })
    @Get('auth/:provider/callback')
    @UseGuards(DiscordGuard, FacebookGuard)
    async loginProviderCallback(@Req() req) {
        return this.authService.login(req.user).catch(err => {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: err.message
            }, HttpStatus.BAD_REQUEST)
        });
    }


    @ApiOkResponse({ description: 'Login user' })
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req) {
        return this.authService.login(req.user).catch(err => {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: err.message
            }, HttpStatus.BAD_REQUEST)
        });
    }

    @ApiCreatedResponse({ description: 'Register new user' })
    @UseGuards(JwtAnonymousGuard)
    @Post('register')
    async register(@Req() { user }, @Body() body: CreateUserDto) {
        if (!user) {
            return this.service.createUser(body).catch(err => {
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    message: err.message
                }, HttpStatus.BAD_REQUEST)
            });
        } else {
            throw new UnauthorizedException('Already logged');
        }
    }

    @ApiOkResponse({ description: 'Get current user profile' })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('profile')
    async getProfile(@Req() { user }) {
        return this.service.getUser(user.id).catch(err => {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: err.message
            }, HttpStatus.BAD_REQUEST)
        })
    }

    @ApiNoContentResponse({ description: 'Edit current user profile' })
    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    @Put('profile')
    async editProfile(@Req() { user }, @Body() body: UpdateUserDto) {
        return this.service.updateUser(user.id, body).catch(err => {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: err.message
            }, HttpStatus.BAD_REQUEST)
        });
    }

    @ApiOkResponse({ description: 'Logout user' })
    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Req() { user }) {
        return user;
    }

    @ApiNoContentResponse({ description: 'Add crypto user' })
    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    @Put('cryptos/:idCrypto')
    async addCrypto(@Req() { user }, @Param('idCrypto') idCrypto: number) {
        return this.service.addCrypto(user, idCrypto).catch(err => {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: err.message
            }, HttpStatus.BAD_REQUEST)
        });
    }

    @ApiNoContentResponse({ description: 'Remove crypto user' })
    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    @Delete('cryptos/:idCrypto')
    async removeCrypto(@Req() { user }, @Param('idCrypto') idCrypto: number) {
        return this.service.removeCrypto(user, idCrypto).catch(err => {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: err.message
            }, HttpStatus.BAD_REQUEST)
        });
    }
}
