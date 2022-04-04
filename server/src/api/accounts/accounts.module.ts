import { Module } from '@nestjs/common';
import { UsersService } from './acounts.service';
import { UsersController } from './accounts.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
