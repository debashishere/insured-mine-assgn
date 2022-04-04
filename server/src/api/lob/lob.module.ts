import { Module } from '@nestjs/common';
import { LobService } from './lob.service';
import { LobController } from './lob.controller';
import { LOBSchema } from './schema/lob.schema';
import { MongooseModule } from '@nestjs/mongoose';

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
  providers: [LobService]
})
export class LobModule { }
