import { ACCOUNT_TYPE } from "../schema/account.type.enum";
import * as mongoose from 'mongoose'
import { POLICY_MODE } from "../../policies/schema/policy-mode.enum";

export interface IAccount {
  _id?: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  account_type: ACCOUNT_TYPE;
  account_name: string;
  premium_amount_written?: number;
  premium_amount?: number;
  plicy_start?: Date;
  policy_end?: Date;
  agent?: mongoose.Types.ObjectId;
  policyMode?: POLICY_MODE;

}