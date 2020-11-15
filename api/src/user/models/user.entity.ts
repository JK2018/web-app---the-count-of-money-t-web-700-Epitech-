import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { UserRole } from './user.interface';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  email: string;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;

  @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
  role: UserRole;

  @Column()
  currency: string;

  @BeforeInsert()
  emailToLowerCase() {
      this.email = this.email.toLowerCase();
  }
}