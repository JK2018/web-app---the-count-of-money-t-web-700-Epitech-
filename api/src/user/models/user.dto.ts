import { ApiProperty } from '@nestjs/swagger';
import { Crypto } from '../../crypto/entities/crypto.entity';

export class CreateUserDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    currency: string;
}

export class CreateUserFromProviderDto {
    @ApiProperty()
    providerId: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    firstName?: string;

    @ApiProperty()
    lastName?: string;

    @ApiProperty()
    username?: string;
}

export class UpdateUserDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    currency: string;

    @ApiProperty()
    cryptos: Crypto[];

    @ApiProperty()
    articleKeywords: string[];
}