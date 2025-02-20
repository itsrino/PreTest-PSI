import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UserService } from './app.service';
import { UserController } from './app.controller';

@Module({
  imports: [HttpModule],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
