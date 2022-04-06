import { forwardRef, Module } from '@nestjs/common';
import { AccountsModule } from '../../api/accounts/accounts.module';
import { AccountsService } from '../../api/accounts/acounts.service';
import { UsersModule } from '../../api/users/users.module';
import { UsersService } from '../../api/users/users.service';
import { AccountsRepository } from '../../api/accounts/accounts.repositoy';
import { ParseService } from './parse.service';
import { PoliciesModule } from '../../api/policies/policies.module';
import { PoliciesService } from '../../api/policies/policies.service';
import { AgentsModule } from '../../api/agents/agents.module';
import { AgentsService } from '../../api/agents/agents.service';
import { AgentsRepository } from '../../api/agents/agents.repository';
import { LOBRepository } from '../../api/lob/lob.repository';
import { LOBService } from '../../api/lob/lob.service';
import { LobModule } from '../../api/lob/lob.module';
import { CarriersModule } from '../../api/carriers/carriers.module';
import { CarriersService } from '../../api/carriers/carriers.service';
import { CarriersRepository } from '../../api/carriers/carriers.repository';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    AgentsModule,
    AccountsModule,
    PoliciesModule,
    LobModule,
    CarriersModule,
  ],

  providers: [
    ParseService,
    UsersService,
    AccountsService,
    AccountsRepository,
    PoliciesService,
    AgentsService,
    AgentsRepository,
    LOBService,
    LOBRepository,
    CarriersService,
    CarriersRepository
  ],
  exports: [
    ParseService
  ]
})
export class ParsesModule { }
