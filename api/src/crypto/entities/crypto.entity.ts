import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/models/user.entity';
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'cryptos'})
export class Crypto {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ unique: true })
    cmids: string;

    @ApiProperty()
    @Column()
    fullName: string;

    @ApiProperty()
    @Column()
    imgUrl: string;

    @ApiProperty()
    @Column()
    default: boolean;

    @ApiProperty()
    @ManyToMany(() => User, (user) => user.cryptos)
    users: User[];
}
