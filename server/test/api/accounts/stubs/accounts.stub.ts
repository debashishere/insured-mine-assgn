import { CreateAccountDto } from "../../../../src/api/accounts/dto/create-account.dto";
import { ACCOUNT_TYPE } from "../../../../src/api/accounts/schema/account.type.enum";


export const getAccountStub = () => {
  const data = {
    account_type: ACCOUNT_TYPE.COMMERCIAL,
    account_name: "Some Name",
  }

  return data
}