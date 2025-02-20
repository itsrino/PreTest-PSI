import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async createUser(
    username: string,
    password: string,
    email: string,
    telp: string,
  ) {
    const existingUser = await this.findByUsername(username);
    if (existingUser) throw new ConflictException('Username already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
      telp,
    });
    return this.userRepository.save(user);
  }

  async validateUser(username: string, password: string) {
    const user = await this.findByUsername(username);
    if (!user) throw new NotFoundException('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new NotFoundException('Invalid credentials');

    return user;
  }
}
