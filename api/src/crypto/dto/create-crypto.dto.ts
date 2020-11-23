import { ApiProperty } from "@nestjs/swagger";

export class CreateCryptoDto {
    @ApiProperty()
    label: string;

    @ApiProperty()
    url_img: string;

    @ApiProperty()
    default: string;
}
