import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Company } from '../company/company.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  telp: string;

  @OneToMany(() => Company, (company) => company.user)
  companies: Company[];
}
