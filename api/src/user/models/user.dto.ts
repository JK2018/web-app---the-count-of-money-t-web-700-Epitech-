import { ApiProperty } from "@nestjs/swagger";

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
}

export class CreateUserFromProviderDto {
    @ApiProperty()
    providerId: string;

    @ApiProperty()
    email?: string;

    @ApiProperty()
    firstName?: string;

    @ApiProperty()
    lastName?: string;

    @ApiProperty()
    username?: string;
}

export class UpdateUserDto {
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    username: string;
}
