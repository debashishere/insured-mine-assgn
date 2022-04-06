import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ICarrier } from "../interfaces/carrier.interface";
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'

export type CarrierDocument = Carrier & Document;

@Schema({ timestamps: true })
export class Carrier implements ICarrier {

  @Prop({ unique: true })
  name: string;

  @Prop()
  catagory: string;

  @Prop()
  csrs: string[];

  // @Prop({
  //   type: [
  //     {
  //       type: mongoose.Types.ObjectId,
  //       ref: 'LOB'
  //     }
  //   ],
  //   required: false,
  //   default: []
  // })
  // lobs: mongoose.Types.ObjectId[];

}

export const CarrierSchema = SchemaFactory.createForClass(Carrier);

