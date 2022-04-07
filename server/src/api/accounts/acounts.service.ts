import { BadRequestException, Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose'
import { Model } from 'mongoose'
import { CommonService } from '../../shared/services/common.service';
import { AccountsRepository } from './accounts.repositoy';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { IAccount } from './interface/account.interface';
import { AccountDocument } from './schema/account.schema';
import { ACCOUNT_TYPE } from './schema/account.type.enum';

@Injectable()
export class AccountsService {
  constructor(
    private readonly AccountsRepository: AccountsRepository,
    private readonly commonService: CommonService
  ) { }

  getModelInstance(): Model<AccountDocument> {
    return this.AccountsRepository.getModelInstance()
  }

  async create(
    createAcountDto: CreateAccountDto)
    : Promise<IAccount> {
    const { accountTypeStr } = createAcountDto;
    if (!accountTypeStr) {
      throw new BadRequestException(
        `accountTypeStr is a required field.`
      )
    }
    createAcountDto.account_type
      = this.getAccountTypeEnum(accountTypeStr);


    if (
      createAcountDto.account_policies &&
      createAcountDto.account_policies.length > 0) {
      const categoryNameStr
        = createAcountDto.account_policies[0].categoryNameStr
      if (categoryNameStr) {
        createAcountDto.account_policies[0].category_name
          = this.commonService.getLOBNameEnum(categoryNameStr)
      }
    }
    return this.AccountsRepository.create(createAcountDto)
  }

  async findAll()
    : Promise<IAccount[]> {
    return this.AccountsRepository.findAll();
  }

  async findOne(
    _id: mongoose.Types.ObjectId)
    : Promise<IAccount> {
    return this.AccountsRepository.findOne(_id);
  }

  async update(
    _id: mongoose.Types.ObjectId,
    updateAcountDto: UpdateAccountDto)
    : Promise<IAccount> {
    return this.AccountsRepository.update(_id, updateAcountDto);
  }

  async remove(
    _id: mongoose.Types.ObjectId)
    : Promise<void> {
    return this.AccountsRepository.deleteOne(_id);
  }

  getAccountTypeEnum(type: string): ACCOUNT_TYPE {
    const typeStr = type
      .match(/[a-zA-Z]+/g)
      .join()
      .toLowerCase()
    // replace , chars
    const cleanType = this.commonService
      .replaceAll(typeStr, ',', '')
    let compVal: string;

    for (const value of Object.values(ACCOUNT_TYPE)) {
      compVal = this.commonService
        .replaceAll(value, '_', '')
        .toLocaleLowerCase();
      if (compVal === cleanType) {
        return ACCOUNT_TYPE[value];
      }
    }
    throw new BadRequestException(`Acount Type Not Found.`)
  }
}
