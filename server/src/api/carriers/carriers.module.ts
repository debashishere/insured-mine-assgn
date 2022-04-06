import { Module } from '@nestjs/common';
import { CarriersService } from './carriers.service';
import { CarriersController } from './carriers.controller';
import { CarrierSchema } from './schema/carrier.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CarriersRepository } from './carriers.repository';
import { LobModule } from '../lob/lob.module'

@Module({
  imports: [
    MongooseModule.forFeature(
      [{
        name: 'Carrier',
        schema: CarrierSchema
      }]
    ),
    LobModule
  ],
  controllers: [CarriersController],
  providers: [
    CarriersService,
    CarriersRepository
  ],
  exports: [
    CarriersService,
    CarriersRepository,
    MongooseModule.forFeature(
      [{
        name: 'Carrier',
        schema: CarrierSchema
      }]
    )
  ]
})
export class CarriersModule { }
