import { POLICY_MODE } from "../schema/policy-mode.enum"
import { POLICY_TYPE } from "../schema/policy-type.enum"


export interface IPolicy {
  policy_num: string;
  policy_type: POLICY_TYPE;
  availableMode: POLICY_MODE[];
}