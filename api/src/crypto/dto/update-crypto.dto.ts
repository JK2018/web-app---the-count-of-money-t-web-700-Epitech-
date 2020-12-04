import { PartialType } from '@nestjs/mapped-types';
import { CreateCryptoDto } from './create-crypto.dto';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCryptoDto extends PartialType(CreateCryptoDto) {
    @ApiProperty()
    fullName: string;

    @ApiProperty()
    imgUrl: string;

    @ApiProperty()
    default: boolean;
}
