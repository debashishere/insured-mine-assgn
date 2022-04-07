import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CATAGORY_NAME } from "../../users/schema/catagory-name.enum";
import { ILOB } from "../interface/lob.interface";
import { Document } from 'mongoose'

export type LOBDocument = LOB & Document;

@Schema({ timestamps: true })
export class LOB implements ILOB {

  @Prop({ unique: true })
  name: CATAGORY_NAME
}

export const LOBSchema = SchemaFactory.createForClass(LOB);

