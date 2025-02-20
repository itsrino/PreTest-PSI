import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity({ name: 'companies' })
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.companies, { onDelete: 'CASCADE' })
  user: User;

  @Column({ unique: true })
  company_code: string;

  @Column()
  company_name: string;
}
