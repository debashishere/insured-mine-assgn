import { POLICY_MODE } from "../schema/policy-mode.enum"
import { POLICY_TYPE } from "../schema/policy-type.enum"
import * as mongoose from 'mongoose'


export interface IPolicy {
  _id?: mongoose.Types.ObjectId;
  policy_num: string;
  policy_type: POLICY_TYPE;
  availableMode: POLICY_MODE[];
  accounts?: mongoose.Types.ObjectId[];
}