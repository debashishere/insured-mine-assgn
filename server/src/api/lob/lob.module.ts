import { Module } from '@nestjs/common';
import { LOBService } from './lob.service';
import { LobController } from './lob.controller';
import { LOBSchema } from './schema/lob.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { LOBRepository } from './lob.repository';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{
        name: 'LOB',
        schema: LOBSchema
      }]
    )
  ],
  controllers: [LobController],
  providers: [
    LOBService,
    LOBRepository
  ],
  exports: [
    MongooseModule.forFeature(
      [{
        name: 'LOB',
        schema: LOBSchema
      }]
    ),
    LOBService,
    LOBRepository
  ]
})
export class LobModule { }
