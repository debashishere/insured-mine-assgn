import { Module } from '@nestjs/common';
import { UsersService } from './acounts.service';
import { UsersController } from './accounts.controller';
import { AccountSchema } from './schema/account.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{
        name: 'Acount',
        schema: AccountSchema
      }]
    )
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
