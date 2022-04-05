import * as mongoose from 'mongoose'
import { POLICY_MODE } from '../../policies/schema/policy-mode.enum';

export interface IAccountPolicy {
  policy_id: mongoose.Types.ObjectId
  premium_amount_written?: number;
  premium_amount?: number;
  plicy_start?: Date;
  policy_end?: Date;
  agent?: mongoose.Types.ObjectId;
  policyMode?: POLICY_MODE;
}