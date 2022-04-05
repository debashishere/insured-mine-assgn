import { forwardRef, Module } from '@nestjs/common';
import { AccountsModule } from '../../api/accounts/accounts.module';
import { AccountsService } from '../../api/accounts/acounts.service';
import { UsersModule } from '../../api/users/users.module';
import { UsersService } from '../../api/users/users.service';
import { AccountsRepository } from '../../api/accounts/accounts.repositoy';
import { ParseService } from './parse.service';
import { PoliciesModule } from '../../api/policies/policies.module';
import { PoliciesService } from '../../api/policies/policies.service';
@Module({
  imports: [
    forwardRef(() => UsersModule),
    AccountsModule,
    PoliciesModule,
  ],

  providers: [
    ParseService,
    UsersService,
    AccountsService,
    AccountsRepository,
    PoliciesService
  ],
  exports: [
    ParseService
  ]
})
export class ParsesModule { }
