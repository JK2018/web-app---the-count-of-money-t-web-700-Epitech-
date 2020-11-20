import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {User} from '../user/user.entity';

@Entity({name: 'cryptos'})
export class Crypto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @ManyToMany(() => User, (user) => user.cryptos)
    users: User[];
}