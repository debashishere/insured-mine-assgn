import { Module } from '@nestjs/common';
import { PoliciesService } from './policies.service';
import { PoliciesController } from './policies.controller';
import { PolicySchema } from './schema/policy.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{
        name: 'Policy',
        schema: PolicySchema
      }]
    )
  ],
  controllers: [PoliciesController],
  providers: [PoliciesService]
})
export class PoliciesModule { }
