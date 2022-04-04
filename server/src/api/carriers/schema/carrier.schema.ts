import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ICarrier } from "../interfaces/carrier.interface";
import { Document } from 'mongoose'

export type CarrierDocument = Carrier & Document;

@Schema({ timestamps: true })
export class Carrier implements ICarrier {

  @Prop()
  name: string;

  @Prop()
  catagory: string;

  @Prop()
  csr: string;
}

export const CarrierSchema = SchemaFactory.createForClass(Carrier);

