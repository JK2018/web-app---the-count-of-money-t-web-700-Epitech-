import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable, BeforeInsert } from 'typeorm';
import { Crypto } from '../crypto/crypto.entity';
import * as bcrypt from 'bcrypt';

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    username: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({
        default: 'user',
    })
    role: string;

    @ManyToMany(() => Crypto, (crypto) => crypto.users)
    @JoinTable()
    cryptos: Crypto[];
    
    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}