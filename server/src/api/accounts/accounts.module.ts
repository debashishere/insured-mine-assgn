import { forwardRef, Module } from '@nestjs/common';
import { AccountSchema } from './schema/account.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsController } from './accounts.controller';
import { AccountsRepository } from './accounts.repositoy';
import { AccountsService } from './acounts.service';
import { UsersModule } from '../users/users.module';
@Module({
  imports: [
    MongooseModule.forFeature(
      [{
        name: 'Account',
        schema: AccountSchema
      }]
    ),
    forwardRef(() => UsersModule),

  ],
  controllers: [AccountsController],
  providers: [
    AccountsService,
    AccountsRepository
  ],
  exports: [
    AccountsService,
    MongooseModule.forFeature(
      [{
        name: 'Account',
        schema: AccountSchema
      }]
    ),
  ]
})
export class AccountsModule { }
