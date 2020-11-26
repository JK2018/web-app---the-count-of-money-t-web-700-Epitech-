import { ApiProperty } from "@nestjs/swagger";

export class CreateCryptoDto {
    @ApiProperty()
    cmids: string;

    @ApiProperty()
    fullName: string;

    @ApiProperty()
    imgUrl: string;
}
