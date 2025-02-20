import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './app.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('random')
  async getRandomUsers(
    @Query('results') results: number = 10,
    @Query('page') page: number = 1,
  ) {
    return this.userService.fetchRandomUsers(results, page);
  }
}
