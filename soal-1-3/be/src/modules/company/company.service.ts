import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyDto } from './create-company.dto';
import { User } from '../user/user.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createCompany(dto: CreateCompanyDto): Promise<Company> {
    const user = await this.userRepository.findOne({
      where: { id: dto.user_id },
    });
    if (!user) throw new NotFoundException('User not found');

    const company = this.companyRepository.create({
      user,
      company_code: dto.company_code,
      company_name: dto.company_name,
    });

    return this.companyRepository.save(company);
  }

  async findAll(): Promise<Company[]> {
    return this.companyRepository.find({ relations: ['user'] });
  }
}
