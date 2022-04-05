import { forwardRef, Inject, Injectable } from "@nestjs/common";
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import { CreateUserDto } from "../../api/users/dto/create-user.dto";
import { PHONE_TAG } from "../../api/users/schema/phone-tag.enum";
import { GENDER } from "../../api/users/schema/gender.enum";
import { USER_TYPE } from "../../api/users/schema/user.type.enum";
import { UsersService } from "../../api/users/users.service";
import { CreateAccountDto } from "../../api/accounts/dto/create-account.dto";
import * as mongoose from 'mongoose'
import { ACCOUNT_TYPE } from "../../api/accounts/schema/account.type.enum";
import { POLICY_MODE } from "../../api/policies/schema/policy-mode.enum";
import { AccountsService } from "../../api/accounts/acounts.service";
import { POLICY_TYPE } from "../../api/policies/schema/policy-type.enum";
import { CreatePolicyDto } from "../../api/policies/dto/create-policy.dto";
import { PoliciesService } from "../../api/policies/policies.service";


interface CsvRow {
  agent: string;
  userType: string;
  policy_mode: string;
  producer: string;
  policy_number: string;
  premium_amount_written: string;
  premium_amount: string;
  policy_type: string;
  company_name: string;
  category_name: string;
  policy_start_date: string;
  policy_end_date: string;
  csr: string;
  account_name: string;
  email: string;
  gender: string;
  firstname: string;
  city: string;
  account_type: string;
  phone: string;
  address: string;
  state: string;
  zip: string;
  dob: string;

}


interface AccountArg {
  user: mongoose.Types.ObjectId,
  policy_id: mongoose.Types.ObjectId,
  agent?: mongoose.Types.ObjectId,
  row: CsvRow
}
// hasActive ClientPolicy
// Active Client



@Injectable()
export class ParseService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly accountsService: AccountsService,
    private readonly policiesService: PoliciesService,


  ) { }

  parseTransform = async (file) => {
    const Users = []


    const pathToCsv = path.resolve(__dirname, '../../../', 'csv', file.filename)

    fs.createReadStream(pathToCsv)
      .pipe(csv.parse({ headers: true }))
      // pipe the parsed input into a csv formatter
      .pipe(
        csv.format<CsvRow, any>({ headers: true }),
      )
      // Using the transform function from the formatting stream
      .transform(async (row, next): Promise<void> => {
        console.log(" transaform ", row)
        const user = await this.toUser(row)
        const createdUser = await this.usersService.create(user)
        console.log(" created ", createdUser)

        // policy
        const policy = await this.toPolicy(row)
        const createdPolicy = await this.policiesService.create(policy);
        console.log(" createdPolicy ", createdPolicy)

        // account
        const args: AccountArg = {
          user: createdUser._id,
          policy_id: createdPolicy._id,
          // TODO: Create agent
          agent: createdUser._id,
          row,
        }
        const account = await this.toAccount(args);
        const createdAcc = await this.accountsService.create(account)
        console.log(" account ", createdAcc)

        // TOD: Update ref in agents
        // next(null,user)

      })
      .pipe(process.stdout)
      .on('end', () => process.exit());
  }

  async toUser(row: CsvRow) {
    const ext = this.getExt(row.phone)
    const Inumber = this.getInumber(row.phone);
    const dob = this.getFormatedDate(row.dob);
    const gender = this.getFormatedGender(row.gender);
    const type = this.getUserType(row.userType)

    const userData = {
      firstName: row.firstname,
      email: row.email,
      phone: [
        {
          tags: [PHONE_TAG.PRIMARY],
          number: row.phone,
          ext,
          Inumber,
        }
      ],
      address: [{
        address: row.address,
        zip: row.zip,
        city: row.city,
        state: row.state
      }],
      dob,
      gender,
      type,
    }
    const user = CreateUserDto.toEntity(userData);
    return user
  }

  async toAccount(AccountArg: AccountArg) {
    const { user, policy_id, row, agent } = AccountArg
    const account_type = this.getAccountType(row.account_type);
    const plicy_start = this.getFormatedDate(row.policy_start_date)
    const policy_end = this.getFormatedDate(row.policy_end_date);
    const policyMode = this.getPolicyMode(row.policy_mode);
    const premium_amount_written = this.getAmount(row.premium_amount_written)
    const premium_amount = this.getAmount(row.premium_amount)

    const accData = {
      user,
      account_type,
      account_name: row.account_name,
      account_policies: [{
        policy_id,
        premium_amount_written,
        premium_amount,
        plicy_start,
        policy_end,
        agent,
        policyMode,
      }]

    }
    const account = CreateAccountDto.toEntity(accData);
    return account
  }

  async toPolicy(row: CsvRow) {
    const policy_type = this.getPolicyType(row.policy_type);
    const availableMode = this.getPolicyMode(row.policy_mode)
    const policyData = {
      policy_num: row.policy_number,
      policy_type,
      availableMode: [availableMode],
      accounts: [],
    }
    const policy = CreatePolicyDto.toEntity(policyData);
    return policy
  }

  // Helpers

  getExt = (number: string): string | null => {
    const isExt = number.search('Ext');
    if (isExt) {
      const parts = number.split(' ');
      return parts[parts.length - 1]
    }
    return null;
  }

  getInumber = (number: string): number => {
    let operateNum = number
    const isExt = this.getExt(number);
    if (isExt) {
      operateNum = number.split('Ext')[0]
    }
    let result = operateNum.match(/\d/g);
    const Inum = parseInt(result.join(""));
    return Inum;
  }

  getFormatedDate = (date: string) => {
    const formated = new Date(date);
    return formated;
  }

  getFormatedGender = (gender: string) => {
    const formated = this.formatToEnum(gender);
    return this.castToGender(formated)
  }

  getUserType = (type: string) => {
    const formated = this.formatToEnum(type);
    return this.castToType(formated)
  }

  castToGender(g: string): GENDER {
    return <GENDER>g;
  }

  castToType(t: string): USER_TYPE {
    return <USER_TYPE>t;
  }

  formatToEnum(data: string): string {
    const slices = data.split(' ').join('_')
    return slices.toLocaleUpperCase()
  }

  getAccountType = (type: string) => {
    const formated = this.formatToEnum(type);
    return this.castToAccType(formated)
  }

  castToAccType(acc: string): ACCOUNT_TYPE {
    return <ACCOUNT_TYPE>acc;
  }

  getPolicyMode(mode: string): POLICY_MODE {
    const numMode = parseInt(mode);
    switch (numMode) {
      case 12:
        return POLICY_MODE.ANNUALLY;
      case 6:
        return POLICY_MODE.SEMI_ANNUALLY;
      case 3:
        return POLICY_MODE.QUATERLY;
      case 1:
        return POLICY_MODE.MONTHLY
    }
  }

  getAmount(amount: string): number | null {
    if (amount.length > 0) {
      return parseInt(amount)
    }
    return null
  }

  getPolicyType = (type: string) => {
    const formated = this.formatToEnum(type);
    return this.castToPolicyType(formated)
  }

  castToPolicyType(policy_type: string): POLICY_TYPE {
    return <POLICY_TYPE>policy_type;
  }


}