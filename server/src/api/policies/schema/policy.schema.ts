import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { POLICY_MODE } from "./policy-mode.enum";
import { POLICY_TYPE } from "./policy-type.enum";
import { IPolicy } from "../interface/policy.interface";
import * as mongoose from 'mongoose'
import { Document } from 'mongoose'


export type PolicyDocument = Policy & Document;

@Schema({ timestamps: true })
export class Policy implements IPolicy {

  @Prop()
  policy_num: string;

  @Prop()
  policy_type: POLICY_TYPE;

  @Prop()
  availableMode: POLICY_MODE[];

}

export const PolicySchema = SchemaFactory.createForClass(Policy);

