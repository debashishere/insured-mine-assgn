import * as mongoose from 'mongoose'
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'
import { IAccountPolicy } from "../interface/account-policy.interface";
import { POLICY_MODE } from "../../policies/schema/policy-mode.enum";


export type AccountPolicyDocument = AccountPolicy & Document;

@Schema({ timestamps: true })
export class AccountPolicy implements IAccountPolicy {
  @Prop()
  producer: string;

  @Prop(
    {
      type: mongoose.Types.ObjectId,
      ref: 'Policy'
    })
  policy_id: mongoose.Types.ObjectId

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

export const AccountPolicySchema
  = SchemaFactory.createForClass(AccountPolicy);

