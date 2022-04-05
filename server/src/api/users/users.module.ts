import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repositoy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/users.schema';
import { ParsesModule } from '../../shared/services/parse.module';
import { ParseService } from '../../shared/services/parse.service';
import { AccountsModule } from '../accounts/accounts.module';
import { PoliciesModule } from '../policies/policies.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{
        name: 'User',
        schema: UserSchema
      }]
    ),
    AccountsModule,
    PoliciesModule,
    forwardRef(() => ParsesModule)
  ],
  controllers: [
    UsersController
  ],
  providers: [
    UsersService,
    UsersRepository,
    ParseService
  ],
  exports: [
    UsersService,
    UsersRepository,
  ]
})
export class UsersModule { }
