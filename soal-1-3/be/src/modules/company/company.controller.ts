import { Controller, Post, Body, Get } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './create-company.dto';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.createCompany(createCompanyDto);
  }

  @Get()
  async getAllCompanies() {
    return this.companyService.findAll();
  }
}
