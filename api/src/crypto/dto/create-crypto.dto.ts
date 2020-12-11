import { ApiProperty } from "@nestjs/swagger";

export class CreateCryptoDto {
    @ApiProperty()
    cmid: string;

    @ApiProperty()
    fullName: string;

    @ApiProperty()
    imgUrl: string;
}
