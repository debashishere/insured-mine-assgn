import { ACCOUNT_TYPE } from "./account.type.enum";
import { IAccount } from "../interface/account.interface";
import * as mongoose from 'mongoose'
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { POLICY_MODE } from "../../policies/schema/policy-mode.enum";

export type AccountDocument = Account & Document;

@Schema({ timestamps: true })
export class Account implements IAccount {
  @Prop()
  user: mongoose.Types.ObjectId

  @Prop()
  account_type: ACCOUNT_TYPE

  @Prop()
  account_name: string;

  @Prop({ required: false, default: 0 })
  premium_amount_written?: number;

  @Prop({ required: false, default: 0 })
  premium_amount?: number;

  @Prop({ required: false })
  plicy_start?: Date;

  @Prop({ required: false })
  policy_end?: Date;

  @Prop({ required: false })
  agent?: mongoose.Types.ObjectId;

  @Prop({ required: false })
  policyMode?: POLICY_MODE;
}

export const AccountSchema = SchemaFactory.createForClass(Account);

