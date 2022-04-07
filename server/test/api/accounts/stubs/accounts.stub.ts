import { ACCOUNT_TYPE } from "../../../../src/api/accounts/schema/account.type.enum";


export const getAccountStub = () => {
  const data = {
    accountTypeStr: ACCOUNT_TYPE.COMMERCIAL,
    account_name: "Some Name",
  }

  return data
}