import { Module } from '@nestjs/common';
import { PoliciesService } from './policies.service';
import { PoliciesController } from './policies.controller';
import { PolicySchema } from './schema/policy.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PoliciesRepository } from './policies.repository'

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
  providers: [
    PoliciesService,
    PoliciesRepository
  ],
  exports: [
    PoliciesService,
    PoliciesRepository
  ]
})
export class PoliciesModule { }
