import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable, BeforeInsert } from 'typeorm';
import { Crypto } from '../../crypto/crypto.entity';
import * as bcrypt from 'bcrypt';

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ unique: true })
    username: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
    role: UserRole;

    @ManyToMany(() => Crypto, (crypto) => crypto.users)
    @JoinTable()
    cryptos: Crypto[];
    
    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}