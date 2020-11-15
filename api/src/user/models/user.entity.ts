import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

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

  @Column()
  currency: string;

  @BeforeInsert()
  emailToLowerCase() {
      this.email = this.email.toLowerCase();
  }
}