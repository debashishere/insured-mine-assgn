import * as mongoose from 'mongoose'
import { POLICY_MODE } from '../../policies/schema/policy-mode.enum';
import { CATAGORY_NAME } from '../../users/schema/catagory-name.enum';

export interface IAccountPolicy {
  producer: string;
  policy_id: mongoose.Types.ObjectId
  premium_amount_written?: number;
  premium_amount?: number;
  plicy_start?: Date;
  policy_end?: Date;
  agent?: mongoose.Types.ObjectId;
  policyMode?: POLICY_MODE;
  company_name?: string;
  csr?: string;
  category_name?: CATAGORY_NAME
}