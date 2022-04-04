import { Module } from '@nestjs/common';
import { CarriersService } from './carriers.service';
import { CarriersController } from './carriers.controller';
import { CarrierSchema } from './schema/carrier.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{
        name: 'Carrier',
        schema: CarrierSchema
      }]
    )
  ],
  controllers: [CarriersController],
  providers: [CarriersService]
})
export class CarriersModule { }
