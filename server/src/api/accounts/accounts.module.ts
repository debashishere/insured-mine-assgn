import { Module } from '@nestjs/common';
import { AccountSchema } from './schema/account.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsController } from './accounts.controller';
import { AccountsRepository } from './accounts.repositoy';
import { AccountsService } from './acounts.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature(
      [{
        name: 'Acount',
        schema: AccountSchema
      }]
    )
  ],
  controllers: [AccountsController],
  providers: [
    AccountsService,
    AccountsRepository]
})
export class AccountsModule { }
