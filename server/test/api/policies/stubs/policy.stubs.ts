import { CreatePolicyDto } from "../../../../src/api/policies/dto/create-policy.dto"
import { POLICY_MODE } from "../../../../src/api/policies/schema/policy-mode.enum"
import { POLICY_TYPE } from "../../../../src/api/policies/schema/policy-type.enum"

export const getPolicyStub = (): CreatePolicyDto => {
  const data = CreatePolicyDto.toEntity({
    policy_num: 'XRFTGHYUJKI',
    policy_type: POLICY_TYPE.PACKAGE,
    availableMode: [POLICY_MODE.QUATERLY],
  })

  return data
}