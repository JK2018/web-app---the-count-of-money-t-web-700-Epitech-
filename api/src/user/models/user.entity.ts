import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable, BeforeInsert } from 'typeorm';
import { Crypto } from '../../crypto/crypto.entity';
import * as bcrypt from 'bcrypt';
import {ApiProperty} from "@nestjs/swagger";

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}

@Entity({name: 'users'})
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ unique: true })
    email: string;

    @ApiProperty()
    @Column()
    password: string;

    @ApiProperty()
    @Column({ unique: true })
    username: string;

    @ApiProperty()
    @Column()
    firstName: string;

    @ApiProperty()
    @Column()
    lastName: string;

    @ApiProperty()
    @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
    role: UserRole;

    @ApiProperty()
    @ManyToMany(() => Crypto, (crypto) => crypto.users)
    @JoinTable()
    cryptos: Crypto[];
    
    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}