import { ACCOUNT_TYPE } from "./account.type.enum";
import { IAccount } from "../interface/account.interface";
import * as mongoose from 'mongoose'
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'
import { AccountPolicy } from "./account-policy.schema";


export type AccountDocument = Account & Document;

@Schema({ timestamps: true })
export class Account implements IAccount {

  @Prop(
    {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    })
  user: mongoose.Types.ObjectId

  @Prop({ ACCOUNT_TYPE })
  account_type: ACCOUNT_TYPE

  @Prop()
  account_name: string;

  @Prop({ AccountPolicy })
  account_policies?: AccountPolicy[];
}

export const AccountSchema = SchemaFactory.createForClass(Account);

