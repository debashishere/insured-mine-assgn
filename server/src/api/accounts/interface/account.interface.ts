import { ACCOUNT_TYPE } from "../schema/account.type.enum";
import * as mongoose from 'mongoose'
import { POLICY_MODE } from "../../policies/schema/policy-mode.enum";
import { AccountPolicy } from "../schema/account-policy.schema";

export interface IAccount {
  _id?: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  account_type: ACCOUNT_TYPE;
  account_name: string;
  account_policies?: AccountPolicy[];
}