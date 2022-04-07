import { forwardRef, Inject, Injectable } from "@nestjs/common";
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import { PHONE_TAG } from "../../api/users/schema/phone-tag.enum";
import { GENDER } from "../../api/users/schema/gender.enum";
import { UsersService } from "../../api/users/users.service";
import { POLICY_MODE } from "../../api/policies/schema/policy-mode.enum";
import { AccountsService } from "../../api/accounts/acounts.service";
import { POLICY_TYPE } from "../../api/policies/schema/policy-type.enum";
import { CreatePolicyDto } from "../../api/policies/dto/create-policy.dto";
import { PoliciesService } from "../../api/policies/policies.service";
import { IAgent } from "../../api/agents/interface/agent.interface";
import { CreateAgentDto } from "../../api/agents/dto/create-agent.dto";
import { AgentsService } from "../../api/agents/agents.service";
import { ICarrier } from "../../api/carriers/interfaces/carrier.interface";
import { ILOB } from "../../api/lob/interface/lob.interface";
import { LOBService } from "../../api/lob/lob.service";
import { CarriersService } from "../../api/carriers/carriers.service";
import { CsvRow } from '../interfaces/csv-row.interface'
import { AccountArg } from '../interfaces/account-arg.interface'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class ParseService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly accountsService: AccountsService,
    private readonly policiesService: PoliciesService,
    private readonly agentsService: AgentsService,
    private readonly lobService: LOBService,
    private readonly carriersService: CarriersService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) { }

  parseTransform = async (file) => {
    let count = 1;
    const pathToCsv =
      path.resolve(
        __dirname, '../../../', 'csv', file.filename
      )

    fs.createReadStream(pathToCsv)
      .pipe(csv.parse({ headers: true }))
      // pipe the parsed input into a csv formatter
      .pipe(
        csv.format<CsvRow, any>({ headers: true }),
      )
      // Using the transform function from the formatting stream
      .transform(async (row, next): Promise<void> => {
        this.logger.info(`ROW NUMBER ${count}, DATA ${JSON.stringify(row)}`)
        // user
        const user = await this.toUser(row)
        const createdUser =
          await this.usersService.create(user)
        this.logger.info(`Created User count ${count} Id ${createdUser._id}`)

        // agent
        const agent = this.toAgent(row);
        const createdAgent =
          await this.agentsService.create(agent);
        this.logger.info(`Created agent count ${count} Id ${createdAgent._id}`)

        // policy
        const policy = this.toPolicy(row)
        const createdPolicy =
          await this.policiesService.create(policy);
        console.log(`Parsing Row No : ${count}`)
        this.logger.info(`Created Policy  count ${count} Id, ${createdPolicy._id}`)

        // account
        const args: AccountArg = {
          user: createdUser._id,
          policy_id: createdPolicy._id,
          agent: createdAgent._id,
          row,
        }
        const account = await this.toAccount(args);
        const createdAcc =
          await this.accountsService.create(account)
        this.logger.info(`Created Account count ${count} Id ${createdAcc._id}`)

        // LOB
        const lob = this.toLOB(row);
        const createdLOB = await this.lobService.create(lob)
        this.logger.info(`Created  LOB  count ${count} Id ${createdLOB._id}`)

        //carrier
        const carrier = this.toCarrier(createdLOB._id, row);
        const createdCarrier =
          await this.carriersService.create(carrier)
        this.logger.info(`Created Carrier count ${count} Id ${createdCarrier._id}`)

        count++;
        return next()

      })
      .pipe(process.stdout)
      .on('end', async () => {
        await this.removeCsv(pathToCsv)
        process.exit()
      });
  }

  async toUser(row: CsvRow) {
    const ext = this.getExt(row.phone)
    const Inumber = this.getInumber(row.phone);
    const dob = this.getFormatedDate(row.dob);
    const gender = this.getFormatedGender(row.gender);
    const userType = row.userType

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
      userType,
    }
    return userData
  }

  async toAccount(AccountArg: AccountArg) {
    const { user, policy_id, row, agent } = AccountArg
    const accountTypeStr = row.account_type

    const plicy_start = this.getFormatedDate(row.policy_start_date)
    const policy_end = this.getFormatedDate(row.policy_end_date);
    const policyMode = this.getPolicyMode(row.policy_mode);
    const premium_amount_written
      = this.getAmount(row.premium_amount_written)
    const premium_amount
      = this.getAmount(row.premium_amount)
    const categoryNameStr = row.category_name

    const accData = {
      user,
      accountTypeStr,
      account_name: row.account_name,
      account_policies: [{
        policy_id,
        producer: row.producer,
        premium_amount_written,
        premium_amount,
        plicy_start,
        policy_end,
        agent,
        policyMode,
        company_name: row.company_name,
        csr: row.csr,
        categoryNameStr,
      }]

    }
    return accData
  }

  toPolicy(row: CsvRow) {
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

  toAgent(row: CsvRow) {
    const agentData: IAgent = {
      name: row.agent,
      producers: [row.producer],
    }
    const agent = CreateAgentDto.toEntity(agentData);
    return agent
  }

  toLOB(
    row: CsvRow) {

    const LOBData: ILOB = {
      categoryName: row.category_name,
    }
    return LOBData
  }

  toCarrier(LOBId, row: CsvRow) {
    const carrierData: ICarrier = {
      name: row.company_name,
      csrs: [row.csr],
      lobs: [LOBId]
    }
    return carrierData
  }



  //************** */ HELPERS*********************

  async removeCsv(path: string) {
    fs.unlink(path, (err) => {
      if (err) throw err
      this.logger.info(`File was deleted`)

    });
  }

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

  castToGender(g: string): GENDER {
    return <GENDER>g;
  }

  formatToEnum(data: string): string {
    const slices = data.split(' ').join('_')
    return slices.toLocaleUpperCase()
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