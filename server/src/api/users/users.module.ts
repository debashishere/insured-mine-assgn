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
import { AgentsModule } from '../agents/agents.module';
import { LOBService } from '../lob/lob.service';
import { CarriersService } from '../carriers/carriers.service';
import { LOBRepository } from '../lob/lob.repository';
import { CarriersRepository } from '../carriers/carriers.repository';
import { LobModule } from '../lob/lob.module';
import { CarriersModule } from '../carriers/carriers.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{
        name: 'User',
        schema: UserSchema
      }]
    ),
    forwardRef(() => AccountsModule),

    PoliciesModule,
    AgentsModule,
    LobModule,
    CarriersModule,
    forwardRef(() => ParsesModule)
  ],
  controllers: [
    UsersController
  ],
  providers: [
    UsersService,
    UsersRepository,
    ParseService,
  ],
  exports: [
    UsersService,
    UsersRepository,
    MongooseModule.forFeature(
      [{
        name: 'User',
        schema: UserSchema
      }]
    ),
  ]
})
export class UsersModule { }
