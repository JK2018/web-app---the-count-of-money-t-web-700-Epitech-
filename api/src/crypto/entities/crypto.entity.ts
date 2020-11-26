import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable, BeforeInsert } from 'typeorm';
import { User } from '../../user/models/user.entity';
import {ApiProperty} from "@nestjs/swagger";

@Entity({name: 'cryptos'})
export class Crypto {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ unique: true })
    cmids: string;

    @ApiProperty()
    fullName: string;

    @ApiProperty()
    imgUrl: string;

    @ApiProperty()
    @Column()
    default: boolean;

    @ApiProperty()
    @ManyToMany(() => User, (user) => user.cryptos)
    @JoinTable()
    users: User[];

    @BeforeInsert()
    async setDefault() {
        this.default = false;
    }
}
