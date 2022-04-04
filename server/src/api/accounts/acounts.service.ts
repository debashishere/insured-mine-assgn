import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose'
import { Model } from 'mongoose'
import { AccountsRepository } from './accounts.repositoy';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { IAccount } from './interface/account.interface';
import { AccountDocument } from './schema/account.schema';

@Injectable()
export class AccountsService {
  constructor(private readonly AccountsRepository: AccountsRepository) { }

  getModelInstance(): Model<AccountDocument> {
    return this.AccountsRepository.getModelInstance()
  }

  async create(
    createAcountDto: CreateAccountDto)
    : Promise<IAccount> {
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
}
