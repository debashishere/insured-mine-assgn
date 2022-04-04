import { Module } from '@nestjs/common';
import { LobService } from './lob.service';
import { LobController } from './lob.controller';

@Module({
  controllers: [LobController],
  providers: [LobService]
})
export class LobModule {}
