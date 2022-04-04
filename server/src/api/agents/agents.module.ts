import { Module } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { AgentsController } from './agents.controller';
import { AgentSchema } from './schema/agents.schema';
import { MongooseModule } from '@nestjs/mongoose';

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
  providers: [AgentsService]
})
export class AgentsModule { }
