import { Module } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { AgentsController } from './agents.controller';
import { AgentSchema } from './schema/agents.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentsRepository } from './agents.repository';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{
        name: 'Agent',
        schema: AgentSchema
      }]
    )
  ],
  controllers: [AgentsController],
  providers: [AgentsService, AgentsRepository]
})
export class AgentsModule { }
