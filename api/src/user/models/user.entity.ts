import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable, BeforeInsert } from 'typeorm';
import { Crypto } from '../../crypto/entities/crypto.entity';
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
    @Column({ nullable: true })
    discord_id?: string;

    @ApiProperty()
    @Column({ nullable: true })
    facebook_id?: string;

    @ApiProperty()
    @Column({ unique: true, nullable: true })
    email?: string;

    @ApiProperty()
    @Column({ nullable: true })
    password?: string;

    @ApiProperty()
    @Column({ unique: true })
    username: string;

    @ApiProperty()
    @Column()
    first_name: string;

    @ApiProperty()
    @Column()
    last_name: string;

    @ApiProperty()
    @Column()
    currency: string;

    @ApiProperty()
    @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
    role: UserRole;

    @ApiProperty()
    @ManyToMany(() => Crypto, (crypto) => crypto.users)
    @JoinTable()
    cryptos: Crypto[];
    
    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
}