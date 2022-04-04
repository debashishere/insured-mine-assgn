import { Module } from "@nestjs/common";
import { UsersModule } from './users/users.module';
import { AgentsModule } from './agents/agents.module';
import { LobModule } from './lob/lob.module';
import { CarriersModule } from './carriers/carriers.module';
import { PoliciesModule } from './policies/policies.module';

@Module({
  imports: [
    UsersModule,
    AgentsModule,
    LobModule,
    CarriersModule,
    PoliciesModule],
  providers: [],
})
export class ApiModule { }